import os 

from flask import Flask
from flask_cors import CORS

def create_app():
    from .extensions import db
    from .routes import main

    app = Flask(__name__)
    CORS(app)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
    db.init_app(app)

    app.register_blueprint(main)

    return app

