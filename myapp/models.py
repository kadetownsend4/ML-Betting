from datetime import datetime
from .extensions import db 

from werkzeug.security import generate_password_hash, check_password_hash

# ChatGPT has been helpful to create these models by simply telling it the columns and what
# relationships they have to the other tables
# https://chatgpt.com/share/67e49261-fcfc-800f-a302-03d2a6125d48 
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
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
    GAME_TYPE = db.Column(db.String(20), nullable=True)

    # Relationships
    TEAM = db.relationship('NFLTeam', backref=db.backref('players', lazy=True)) 

    # 🔗 One-to-many relationship to quarterback weekly stats
    weekly_stats = db.relationship(
        'NFLQuarterbackWeeklyStats',
        back_populates='player',
        cascade='all, delete-orphan'
    )

    def __repr__(self):
        return f"<Player {self.PLAYER_NAME} ({self.TEAM.team_name})>"
    
class NFLQuarterbackWeeklyStats(db.Model):
    __tablename__ = 'nfl_qb_weekly_stats'

    STAT_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Foreign key relationship to NFLPlayer
    PLAYER_ID = db.Column(db.String(25), db.ForeignKey('nfl_player.PLAYER_ID'), nullable=False)
    PLAYER = db.relationship('NFLPlayer', backref=db.backref('qb_weekly_stats', lazy=True))

    # General Info
    PLAYER_NAME = db.Column(db.String(100), nullable=False)
    PLAYER_ABBR = db.Column(db.String(50), nullable=True)
    GAME_ID = db.Column(db.String(50), nullable=True)
    WEEK = db.Column(db.Integer, nullable=False)
    RECENT_TEAM = db.Column(db.String(10), nullable=True)
    OPPONENT_TEAM = db.Column(db.String(10), nullable=True)
    SEASON = db.Column(db.Integer, nullable=False)
    SEASON_TYPE = db.Column(db.String(20), nullable=True)
    POSITION = db.Column(db.String(10), nullable=True)
    HEADSHOT_URL = db.Column(db.String(255), nullable=True)

    # Passing Stats
    COMPLETIONS = db.Column(db.Integer, nullable=True)
    ATTEMPTS = db.Column(db.Integer, nullable=True)
    PASSING_YARDS = db.Column(db.Integer, nullable=True)
    PASSING_TDS = db.Column(db.Integer, nullable=True)
    INTERCEPTIONS = db.Column(db.Integer, nullable=True)
    SACKS = db.Column(db.Integer, nullable=True)
    SACK_YARDS = db.Column(db.Integer, nullable=True)
    SACK_FUMBLES = db.Column(db.Integer, nullable=True)
    SACK_FUMBLES_LOST = db.Column(db.Integer, nullable=True)
    PASSING_AIR_YARDS = db.Column(db.Float, nullable=True)
    PASSING_YARDS_AFTER_CATCH = db.Column(db.Float, nullable=True)
    PASSING_FIRST_DOWNS = db.Column(db.Integer, nullable=True)
    PASSING_EPA = db.Column(db.Float, nullable=True)
    PASSING_2PT_CONVERSIONS = db.Column(db.Integer, nullable=True)
    PACR = db.Column(db.Float, nullable=True)
    DAKOTA = db.Column(db.Float, nullable=True)

    # Rushing Stats
    CARRIES = db.Column(db.Integer, nullable=True)
    RUSHING_YARDS = db.Column(db.Integer, nullable=True)
    RUSHING_TDS = db.Column(db.Integer, nullable=True)
    RUSHING_FUMBLES = db.Column(db.Integer, nullable=True)
    RUSHING_FUMBLES_LOST = db.Column(db.Integer, nullable=True)
    RUSHING_FIRST_DOWNS = db.Column(db.Integer, nullable=True)
    RUSHING_EPA = db.Column(db.Float, nullable=True)
    SPECIAL_TEAMS_TDS = db.Column(db.Integer, nullable=True)

    # Fantasy
    FANTASY_POINTS = db.Column(db.Float, nullable=True)
    FANTASY_POINTS_PPR = db.Column(db.Float, nullable=True)

    # Advanced Passing Metrics
    PASSING_DROPS = db.Column(db.Integer, nullable=True)
    PASSING_DROP_PCT = db.Column(db.Float, nullable=True)
    PASSING_BAD_THROWS = db.Column(db.Integer, nullable=True)
    PASSING_BAD_THROW_PCT = db.Column(db.Float, nullable=True)

    TIMES_SACKED = db.Column(db.Integer, nullable=True)
    TIMES_BLITZED = db.Column(db.Integer, nullable=True)
    TIMES_HURRIED = db.Column(db.Integer, nullable=True)
    TIMES_HIT = db.Column(db.Integer, nullable=True)
    TIMES_PRESSURED = db.Column(db.Integer, nullable=True)
    TIMES_PRESSURED_PCT = db.Column(db.Float, nullable=True)

    # Rushing Advanced
    RUSHING_YARDS_BEFORE_CONTACT = db.Column(db.Float, nullable=True)
    RUSHING_YARDS_BEFORE_CONTACT_AVG = db.Column(db.Float, nullable=True)
    RUSHING_YARDS_AFTER_CONTACT = db.Column(db.Float, nullable=True)
    RUSHING_YARDS_AFTER_CONTACT_AVG = db.Column(db.Float, nullable=True)
    RUSHING_BROKEN_TACKLES = db.Column(db.Integer, nullable=True)

    # Snap Counts
    OFFENSE_SNAPS = db.Column(db.Integer, nullable=True)
    OFFENSE_PCT = db.Column(db.Float, nullable=True)
    PLAYER_POSITION = db.Column(db.String(10), nullable=True)

    # Air Yards + Aggressiveness
    AVG_TIME_TO_THROW = db.Column(db.Float, nullable=True)
    AVG_COMPLETED_AIR_YARDS = db.Column(db.Float, nullable=True)
    AVG_INTENDED_AIR_YARDS = db.Column(db.Float, nullable=True)
    AVG_AIR_YARDS_DIFFERENTIAL = db.Column(db.Float, nullable=True)
    AGGRESSIVENESS = db.Column(db.Float, nullable=True)
    MAX_COMPLETED_AIR_DISTANCE = db.Column(db.Float, nullable=True)
    AVG_AIR_YARDS_TO_STICKS = db.Column(db.Float, nullable=True)

    # Completion % / Efficiency
    PASSER_RATING = db.Column(db.Float, nullable=True)
    COMPLETION_PERCENTAGE = db.Column(db.Float, nullable=True)
    EXPECTED_COMPLETION_PERCENTAGE = db.Column(db.Float, nullable=True)
    COMPLETION_PERCENTAGE_ABOVE_EXPECTATION = db.Column(db.Float, nullable=True)
    AVG_AIR_DISTANCE = db.Column(db.Float, nullable=True)
    MAX_AIR_DISTANCE = db.Column(db.Float, nullable=True)

    def __repr__(self):
        return f"<QBStats {self.PLAYER_NAME} - Week {self.WEEK}, Season {self.SEASON}>"



    





