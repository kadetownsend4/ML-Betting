"""
    File responsible for the intialization and creation of our configured
    Flask application 

    The video below discussed how to intialize and deploy a Flask app connected to a 
    PostgreSQL database and laid the foundation for the set up of our flask application
    and database intialization. This was one of the foundational files.

    Video reference: https://www.youtube.com/watch?v=IBfj_0Zf2Mo 

    authors = Timothy Berlanga
"""
import os 
from flask import Flask

# Enables Cross-Origin Resoure Sharing allowing for the frontend to interact with the backend
from flask_cors import CORS
# Handles database schema changes through migration scripts to update the DB
from flask_migrate import Migrate

def create_app():
    """
    Function to initialize and configure the Flask app.

    Return: 
        Configured Flask app instance 
    """
    # Import database and route blueprints from our application's packages
    from .extensions import db
    from .routes import main
    from .nfl_routes import nfl_stats_bp 

    # Create a flask application instance 
    app = Flask(__name__)
    
    # Initialize Flask-Migrate to handle DB migrations 
    migrate = Migrate(app, db)


    # Enables CORS to allow request from specific frontend origins 
    # These origins are our local testing urls from codespaces, vscode, and the deployed react render url 
    CORS(app, supports_credentials=True, origins=[
    "http://localhost:3000",
    "https://ml-betting-react-app.onrender.com",
    "https://curly-chainsaw-7vv965p9p5jr2rpq4-3000.app.github.dev"])
    
    """
        Discovered I need to set a backup secret key when I was having trouble with login and registration.I had to set a default fallback 
        one to use for a while, but I discovered during documentation that I simply misnamed the env variable in render, so we are no longer
        using the fallback. It was at the beginning of this conversation where I asked chatgpt why I was getting errors with the secret keys. 

        Chat Link: https://chatgpt.com/share/68030ca6-ca1c-800f-bed1-19bf6cd02b0a

        I discovered the solution during documentation. I forgot I had named the env variable "SECRET" instead of "SECRET_KEY" smh.
    """

    # Set the SECRET_KEY from environment variable or fallback to a default one if not set
    app.config["SECRET_KEY"] = os.environ.get("SECRET", "FALLBACK")
    # Set the DATABASE_URI to the hidden enviornment variable
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")

    # Initialize SQLALchemy with the flask application instance 
    db.init_app(app)

    # Register Flask blueprints for routing 

    # Main routes contains login, user, and nba routes 
    app.register_blueprint(main)
    # Routes specifically related to NFL 
    app.register_blueprint(nfl_stats_bp)

    # Creates a fully configured flask instance connected to our database, routes, and allows for CORS
    return app

