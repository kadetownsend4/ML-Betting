import os 

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

def create_app():
    from .extensions import db
    from .routes import main
    from .nfl_routes import nfl_stats_bp 


    app = Flask(__name__)
    
    # Initialize Migrate
    migrate = Migrate(app, db)

    CORS(app)
   
    # Set the SECRET_KEY from environment variable or fallback to a default one if not set
    app.config["SECRET_KEY"] = os.environ.get("SECRET", "32e865dab7e61c1ed8ea62b5a6211bfde377dab86dd232976ec5944a1edfee79")
    print("SECRET_KEY is:", app.config['SECRET_KEY'])
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
    db.init_app(app)
    app.register_blueprint(main)
    app.register_blueprint(nfl_stats_bp)


    return app

