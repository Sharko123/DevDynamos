from flask import Blueprint, request, jsonify, url_for
from app.models import Beat, User
from werkzeug.utils import secure_filename
from app.utils.database import db


# This file contains the three routes
# - Uploading a beat
# - Getting beats from the database
# - Get User's uploaded beats

beat_bp = Blueprint('beat', __name__)


@beat_bp.route('/upload-beat', methods=['POST'])
def upload_beat():
    # Check authentication
    user_id = request.cookies.get('user_id')  # Get user ID from the cookie

    data = request.form
    file = request.files['file']
    file_path = f'backend/static/beats/{secure_filename(file.filename)}'
    file.save(file_path)
    new_beat = Beat(name=data['name'],
                    file_path=file_path, user_id=1)
    db.session.add(new_beat)
    db.session.commit()
    return jsonify({"message": "Beat uploaded successfully"}), 201


@beat_bp.route('/getbeats', methods=['GET'])
def get_beats():
    beats = Beat.query.all()
    beats_data = []
    for beat in beats:
        file_url = url_for(
            'static', filename=f'beats/{beat.file_path}', _external=True)
        print(file_url)
        beats_data.append(
            {"id": beat.id, "name": beat.name, "file_url": file_url.replace("backend/static/beats/", "")})

    return jsonify(beats_data)


@beat_bp.route('/getUserBeats/<int:user_id>', methods=['GET'])
def get_user_beats(user_id):
    beats = Beat.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": beat.id, "name": beat.name, "file_path": beat.file_path} for beat in beats])
