from flask import Blueprint, send_file, jsonify, request
import os
import sys

# Add the path to AI-Beat-Maker-master to PYTHONPATH


def import_main():
    global main
    sys.path.append(os.path.abspath(os.path.join(
        os.path.dirname(__file__), '../../../', 'BeatGen', 'BeatGen')))
    from main import main  # Adjust the import path as necessary


import_main()

generated_path = ""
generate_bp = Blueprint('generate', __name__)

# This file has all the beat generation routes


@generate_bp.route('/generate-audio', methods=["POST", "GET"])
def generate_audio():
    try:
        # check if file is found
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if file and file.filename.endswith('.wav'):
            input_audio_path = 'generated/input/input_audio.wav'
            output_audio_path = 'generated/output/generated_beat.wav'
            file.save(input_audio_path)

            # # Retrieve boolean parameters from form data
            drums = request.form.get('drums') == 'true'
            bass = request.form.get('bass') == 'true'

            # Call the `main` function to generate the beat
            # Adjust parameters as needed
            main(input_audio_path, drums, bass, 8, output_audio_path)
            print("finished generating")
            if os.path.exists(output_audio_path):
                print(os.path.abspath(output_audio_path))
                return send_file(os.path.abspath(output_audio_path), as_attachment=True, mimetype='audio/mpeg')
            else:
                return jsonify({'error': 'Generated audio file not found'}), 500
        else:
            return jsonify({'error': 'Invalid file type'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
