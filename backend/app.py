from flask import Flask, request, send_file, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, UserMixin
from flask_cors import CORS
import os
import sys



# Add the path to AI-Beat-Maker-master to PYTHONPATH
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'BeatGen', 'BeatGen')))

from main import main  # Adjust the import path as necessary

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
# app.config["SECRET_KEY"] = "ADMIN"
# db = SQLAlchemy(app)
# login_manager = LoginManager(app)

# # Create user model
# class Users(UserMixin, db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(250), unique=True, nullable=False)
#     password = db.Column(db.String(250), nullable=False)

# @login_manager.user_loader
# def load_user(user_id):
#     return Users.query.get(user_id)

# @app.route('/login', methods=["POST"])
# def login():
#     username = request.form.get('email')
#     password = request.form.get('password')
    
#     user = Users.query.filter_by(username=username).first()
    
#     if user and user.password == password:
#         login_user(user)
#         return jsonify({"message": "Login successful"}), 200
#     else:
#         return jsonify({"error": "Invalid username or password"}), 401


@app.route('/generate-audio', methods=["POST", "GET"])
def generate_audio():
    try:
        #check if file is found
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
            main.main(input_audio_path, drums, bass, 8, output_audio_path)  # Adjust parameters as needed

            if os.path.exists(output_audio_path):
                return send_file(output_audio_path, as_attachment=True, mimetype='audio/mpeg')
            else:
                return jsonify({'error': 'Generated audio file not found'}), 500
        else:
            return jsonify({'error': 'Invalid file type'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
