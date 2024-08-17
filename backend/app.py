from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def get_data():
    return jsonify({"message": "API is Running"})

@app.route('/generate-audio', methods=['POST'])
def generate_audio():
    try:
        # Simulate audio generation by sending a dummy file
        audio_file_path = 'track_1.wav'  # Path to your dummy audio file
        
        if os.path.exists(audio_file_path):
            return send_file(audio_file_path, as_attachment=True, mimetype='audio/mpeg')
        else:
            return jsonify({'error': 'Audio file not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Ensure port is not conflicting with React
