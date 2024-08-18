from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Create the database
# Create migrations for it
db = SQLAlchemy()
migrate = Migrate()
