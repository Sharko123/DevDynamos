from flask import Flask, request, send_file, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, UserMixin
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
app.config["SECRET_KEY"] = "ADMIN"
db = SQLAlchemy(app)
login_manager = LoginManager(app)

# Create user model
class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(user_id)

@app.route('/login', methods=["POST"])
def login():
    username = request.form.get('email')
    password = request.form.get('password')
    
    user = Users.query.filter_by(username=username).first()
    
    if user and user.password == password:
        login_user(user)
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome Home"})

@app.route('/generate-audio', methods=['POST'])
def generate_audio():
    try:
        audio_file_path = 'track_1.wav'
        if os.path.exists(audio_file_path):
            return send_file(audio_file_path, as_attachment=True, mimetype='audio/mpeg')
        else:
            return jsonify({'error': 'Audio file not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
