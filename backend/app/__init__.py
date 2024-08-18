from flask import Flask
from app.utils.database import db, migrate
from app.routes.auth_routes import auth_bp
from app.routes.beat_routes import beat_bp
from app.routes.generate_routes import generate_bp


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object('config.Config')

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(auth_bp)
    app.register_blueprint(beat_bp)
    app.register_blueprint(generate_bp)

    return app
