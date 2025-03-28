from datetime import datetime
from .extensions import db 

from werkzeug.security import generate_password_hash, check_password_hash

# ChatGPT has been helpful to create these models by simply telling it the columns and what
# relationships they have to the other tables
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


class NFLTeam(db.Model):
    TEAM_ID = db.Column(db.Integer, primary_key=True)
    TEAM_NAME = db.Column(db.String(50), unique=True, nullable=False)
    TEAM_ABR = db.Column(db.String(10), unique=True, nullable=False)
    TEAM_NICKNAME = db.Column(db.String(50), unique=True, nullable=False)
    TEAM_CONF = db.Column(db.String(50), nullable=False)
    TEAM_DIVISION = db.Column(db.String(50), nullable=False)
    TEAM_LOGO = db.Column(db.String(128), nullable=False)
    TEAM_WORDMARK = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f"<NFLTeam {self.TEAM_NAME} ({self.TEAM_ABR})>"

class NFLPlayer(db.Model):
    # Primary key and foreign key
    PLAYER_ID = db.Column(db.String(25), primary_key=True) 
    # Team reference
    TEAM_ID = db.Column(db.Integer, db.ForeignKey('nfl_team.TEAM_ID'), nullable=False) 
    # Other fields
    SEASON = db.Column(db.Integer, nullable=False)
    TEAM = db.relationship('NFLTeam', backref=db.backref('players', lazy=True))  # Link to Team table
    PLAYER_NAME = db.Column(db.String(100), nullable=False)
    FIRST_NAME = db.Column(db.String(50), nullable=False)
    LAST_NAME = db.Column(db.String(50), nullable=False)
    POSITION = db.Column(db.String(10), nullable=False)
    STATUS = db.Column(db.String(20), nullable=True)
    WEEK = db.Column(db.Integer, nullable=True)
    GAME_TYPE = db.Column(db.String(20), nullable=True)

    def __repr__(self):
        return f"<Player {self.PLAYER_NAME} ({self.TEAM.team_name})>"

    
# class NFLPlayer(db.Model):
#     __tablename__ = 'nfl_players'
    
#     id = db.Column(db.Integer, db.ForeignKey('players.id'), primary_key=True)
#     position = db.Column(db.String(20), nullable=True)  # e.g., 'QB', 'RB', 'WR', 'TE'
#     height = db.Column(db.String(10), nullable=True)
#     weight = db.Column(db.Integer, nullable=True)
#     age = db.Column(db.Integer, nullable=True) 
    
#     # Relationships based on position
#     qb_stats = db.relationship('QuarterbackStats', backref='player_qb', uselist=False)
#     wr_stats = db.relationship('WideReceiverStats', backref='player_wr', uselist=False)
#     te_stats = db.relationship('TightEndStats', backref='player_te', uselist=False)
#     rb_stats = db.relationship('RunningbackStats', backref='player_rb', uselist=False)

#     __mapper_args__ = {
#         'polymorphic_identity': 'NFL',
#         'polymorphic_on': position
#     }

#     # Ensure valid positions
#     __table_args__ = (
#         db.CheckConstraint("position IN ('QB', 'RB', 'WR', 'TE')", name='valid_position_check'),
#     )





