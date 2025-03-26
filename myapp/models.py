from datetime import datetime
from .extensions import db 

from werkzeug.security import generate_password_hash, check_password_hash

# I got help from ChatGPT with setting up the User model
# https://chatgpt.com/share/67e49261-fcfc-800f-a302-03d2a6125d48
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Methods to hash and check passwords
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    # # Optional relationships
    # picks = db.relationship('Pick', backref='user', lazy=True)
    # bet_history = db.relationship('BetHistory', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

    def __init__(self, username, email):
        self.username = username
        self.email = email




