from flask import Blueprint, request, jsonify
from app.models import Reaction, User, Beat
from app.utils.database import db

reaction_bp = Blueprint('reaction', __name__)


@reaction_bp.route('/react', methods=['POST'])
def react_to_beat():
    data = request.json
    user_id = data.get('user_id')
    beat_id = data.get('beat_id')
    liked = data.get('liked')

    if not all([user_id, beat_id, liked is not None]):
        return jsonify({"error": "Invalid data"}), 400

    # Check if the user has already reacted to the beat
    reaction = Reaction.query.filter_by(
        user_id=user_id, beat_id=beat_id).first()

    if reaction:
        # If reaction exists, update the existing reaction
        reaction.liked = liked
    else:
        # If no reaction exists, create a new one
        new_reaction = Reaction(user_id=user_id, beat_id=beat_id, liked=liked)
        db.session.add(new_reaction)

    db.session.commit()
    return jsonify({"message": "Reaction saved successfully"}), 201


@reaction_bp.route('/get-reactions/<int:beat_id>', methods=['GET'])
def get_reactions(beat_id):
    reactions = Reaction.query.filter_by(beat_id=beat_id).all()
    return jsonify([{
        "user_id": reaction.user_id,
        "beat_id": reaction.beat_id,
        "liked": reaction.liked,
        "created_at": reaction.created_at
    } for reaction in reactions])


@reaction_bp.route('/user-reaction/<int:user_id>/<int:beat_id>', methods=['GET'])
def get_user_reaction(user_id, beat_id):
    reaction = Reaction.query.filter_by(
        user_id=user_id, beat_id=beat_id).first()
    if reaction:
        return jsonify({
            "user_id": reaction.user_id,
            "beat_id": reaction.beat_id,
            "liked": reaction.liked,
            "created_at": reaction.created_at
        })
    return jsonify({"message": "No reaction found"}), 404
