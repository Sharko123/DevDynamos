from flask import Blueprint, request, jsonify
from app.models import Beat, User
from app.utils.database import db

# This file contains the three routes
# - Uploading a beat
# - Getting beats from the database
# - Get User's uploaded beats

beat_bp = Blueprint('beat', __name__)


@beat_bp.route('/upload-beat', methods=['POST'])
def upload_beat():
    data = request.form
    file = request.files['file']
    file_path = f'beats/{file.filename}'
    file.save(file_path)
    new_beat = Beat(name=data['name'],
                    file_path=file_path, user_id=data['user_id'])
    db.session.add(new_beat)
    db.session.commit()
    return jsonify({"message": "Beat uploaded successfully"}), 201


@beat_bp.route('/getbeats', methods=['GET'])
def get_beats():
    # Get all the beats from the database because we don't have a generation system
    beats = Beat.query.all()
    return jsonify([{"id": beat.id, "name": beat.name, "file_path": beat.file_path} for beat in beats])


@beat_bp.route('/getUserBeats/<int:user_id>', methods=['GET'])
def get_user_beats(user_id):
    beats = Beat.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": beat.id, "name": beat.name, "file_path": beat.file_path} for beat in beats])
