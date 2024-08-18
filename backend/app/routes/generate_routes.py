from flask import Blueprint, send_file, jsonify
import os
from BeatGen.BeatGen import main

generate_bp = Blueprint('generate', __name__)

# This file has all the beat generation routes


@generate_bp.route('/generate-audio', methods=['GET'])
def generate_audio(request):
    try:
        # check if file is found
        print(request.files)
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if file and file.filename.endswith('.wav'):
            input_audio_path = 'input_audio.wav'
            output_audio_path = 'generated_beat.wav'
            file.save(input_audio_path)
            # Retrieve boolean parameters from form data
            drums = request.form.get('drums') == 'true'
            bass = request.form.get('bass') == 'true'
            # Call the `main` function to generate the beat
            # Adjust parameters as needed
            # main.main(input_audio_path, drums, bass, 8, output_audio_path)

            if os.path.exists(output_audio_path):
                return send_file(output_audio_path, as_attachment=True, mimetype='audio/mpeg')
            else:
                return jsonify({'error': 'Generated audio file not found'}), 500
        else:
            return jsonify({'error': 'Invalid file type'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
