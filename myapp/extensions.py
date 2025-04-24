"""
    File responsible for the intialization and creation of our SQLAlchemy database to be used throuhout 
    our application. 

    The video below discussed how to intialize and deploy a Flask app connected to a 
    PostgreSQL database and laid the foundation for the set up of our flask application
    and database intialization. This was one of the foundational files for the application.

    Video reference: https://www.youtube.com/watch?v=IBfj_0Zf2Mo 

    authors = Timothy Berlanga
"""
from flask_sqlalchemy import SQLAlchemy

# Initialize the SQLAlchemy object for the application
db = SQLAlchemy()
