import os 

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

def create_app():
    from .extensions import db
    from .routes import main

    app = Flask(__name__)
    
    # Initialize Migrate
    migrate = Migrate(app, db)

    CORS(app)
   
    # Set the SECRET_KEY from environment variable or fallback to a default one if not set
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
    db.init_app(app)
    app.register_blueprint(main)

    return app

