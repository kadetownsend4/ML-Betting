from datetime import datetime
from .extensions import db 
from sqlalchemy import PrimaryKeyConstraint

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

class NBATeam(db.Model):
    __tablename__ = 'nbateams'
    TEAM_ID = db.Column(db.Integer, primary_key=True)
    TEAM_NAME = db.Column(db.String(50), nullable=False)
    TEAM_ABR = db.Column(db.String(50), nullable=False)
    TEAM_NICKNAME = db.Column(db.String(50), nullable=False)
    TEAM_CITY = db.Column(db.String(50), nullable=False)
    TEAM_STATE = db.Column(db.String(50), nullable=False)
    TEAM_YEAR_FOUNDED = db.Column(db.Integer, nullable=False)
    TEAM_LOGO = db.Column(db.String(75), nullable=False)

    HOME_GAMES = db.relationship(
        'NBAGameIds', foreign_keys='NBAGameIds.HOME_TEAM_ID', backref='HOME_TEAM_REF', lazy='dynamic')
    AWAY_GAMES = db.relationship(
        'NBAGameIds', foreign_keys='NBAGameIds.AWAY_TEAM_ID', backref='AWAY_TEAM_REF', lazy='dynamic')


class NBAGameLogs(db.Model):
    __tablename__ = 'nbagamelogs'
    

    CITY = db.Column(db.String(50), nullable=False)
    NICKNAME = db.Column(db.String(50), nullable=False)
    TEAM_ID = db.Column(db.Integer, db.ForeignKey('nbateams.TEAM_ID'), nullable=False) 
    W = db.Column(db.Integer, nullable=False)
    L = db.Column(db.Integer, nullable=False)
    W_HOME = db.Column(db.Integer, nullable=False)
    L_HOME = db.Column(db.Integer, nullable=False)
    W_ROAD = db.Column(db.Integer, nullable=False)
    L_ROAD = db.Column(db.Integer, nullable=False)
    TEAM_TURNOVERS = db.Column(db.Integer, nullable=False)
    TEAM_REBOUNDS = db.Column(db.Integer, nullable=False)
    GP = db.Column(db.Integer, nullable=False)
    GS = db.Column(db.Integer, nullable=False)
    ACTUAL_MINUTES = db.Column(db.Integer, nullable=False)
    ACTUAL_SECONDS = db.Column(db.Integer, nullable=False)
    FG = db.Column(db.Integer, nullable=False)
    FGA = db.Column(db.Integer, nullable=False)
    FG_PCT = db.Column(db.Float, nullable=False)
    FG3 = db.Column(db.Integer, nullable=False)
    FG3A = db.Column(db.Integer, nullable=False)
    FG3_PCT = db.Column(db.Float, nullable=False)
    FT = db.Column(db.Integer, nullable=False)
    FTA = db.Column(db.Integer, nullable=False)
    FT_PCT = db.Column(db.Float, nullable=False)
    OFF_REB = db.Column(db.Integer, nullable=False)
    DEF_REB = db.Column(db.Integer, nullable=False)
    TOT_REB = db.Column(db.Integer, nullable=False)
    AST = db.Column(db.Integer, nullable=False)
    PF = db.Column(db.Integer, nullable=False)
    STL = db.Column(db.Integer, nullable=False)
    TOTAL_TURNOVERS = db.Column(db.Integer, nullable=False)
    BLK = db.Column(db.Integer, nullable=False)
    PTS = db.Column(db.Integer, nullable=False)
    AVG_REB = db.Column(db.Float, nullable=False)
    AVG_PTS = db.Column(db.Float, nullable=False)
    DQ = db.Column(db.Integer, nullable=False)
    OFFENSIVE_EFFICIENCY = db.Column(db.Float, nullable=False)
    SCORING_MARGIN = db.Column(db.Float, nullable=False)
    SEASON = db.Column(db.String(50), nullable=False)
    GAME_DATE = db.Column(db.String(50), nullable=False)
    GAME_ID = db.Column(db.Integer, db.ForeignKey(
        'nbagameids.GAME_ID'), nullable=False) 
    HOME_FLAG = db.Column(db.Integer, nullable=False)
    AWAY_FLAG = db.Column(db.Integer, nullable=False)
    HOME_WIN_PCTG = db.Column(db.Float, nullable=True)
    AWAY_WIN_PCTG = db.Column(db.Float, nullable=True)
    TOTAL_WIN_PCTG = db.Column(db.Float, nullable=False)
    ROLLING_SCORING_MARGIN = db.Column(db.Float, nullable=False)
    ROLLING_OE = db.Column(db.Float, nullable=False)
    NUM_REST_DAYS = db.Column(db.Float, nullable=True)

    #game = db.relationship('NBAGameIds', back_populates='log')

    __table_args__ = (
        PrimaryKeyConstraint('GAME_ID', 'TEAM_ID', name='pk_game_team'),
    )

    # Predictions = db.relationship(
    #     'NBAGameIds', foreign_keys='NBAGameIds.GAME_ID', backref='GAME_REF', lazy='dynamic')


class NBAPredictions(db.Model):
    __tablename__ = 'nbapredictions'
    GAME_ID = db.Column(db.Integer, db.ForeignKey(
        'nbagameids.GAME_ID'), primary_key=True)
    OG_LR_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG_LR_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG_SVM_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG_SVM_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG_GNB_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG_GNB_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG_GB_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG_GB_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG_DT_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG_DT_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG_KNN_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG_KNN_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG_MLP_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG_MLP_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG_RF_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG_RF_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG3_LR_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG3_LR_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG3_SVM_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG3_SVM_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG3_GNB_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG3_GNB_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG3_GB_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG3_GB_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG3_DT_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG3_DT_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG3_KNN_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG3_KNN_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG3_MLP_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG3_MLP_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    OG3_RF_HOME_W_PROB = db.Column(db.Float, nullable=False)
    OG3_RF_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    REG_LR_HOME_W_PROB = db.Column(db.Float, nullable=False)
    REG_LR_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    REG_SVM_HOME_W_PROB = db.Column(db.Float, nullable=False)
    REG_SVM_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    REG_GNB_HOME_W_PROB = db.Column(db.Float, nullable=False)
    REG_GNB_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    REG_GB_HOME_W_PROB = db.Column(db.Float, nullable=False)
    REG_GB_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    REG_DT_HOME_W_PROB = db.Column(db.Float, nullable=False)
    REG_DT_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    REG_KNN_HOME_W_PROB = db.Column(db.Float, nullable=False)
    REG_KNN_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    REG_MLP_HOME_W_PROB = db.Column(db.Float, nullable=False)
    REG_MLP_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    REG_RF_HOME_W_PROB = db.Column(db.Float, nullable=False)
    REG_RF_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    CF_LR_HOME_W_PROB = db.Column(db.Float, nullable=False)
    CF_LR_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    CF_SVM_HOME_W_PROB = db.Column(db.Float, nullable=False)
    CF_SVM_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    CF_GNB_HOME_W_PROB = db.Column(db.Float, nullable=False)
    CF_GNB_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    CF_GB_HOME_W_PROB = db.Column(db.Float, nullable=False)
    CF_GB_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    CF_DT_HOME_W_PROB = db.Column(db.Float, nullable=False)
    CF_DT_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    CF_KNN_HOME_W_PROB = db.Column(db.Float, nullable=False)
    CF_KNN_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    CF_MLP_HOME_W_PROB = db.Column(db.Float, nullable=False)
    CF_MLP_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    CF_RF_HOME_W_PROB = db.Column(db.Float, nullable=False)
    CF_RF_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    FE_LR_HOME_W_PROB = db.Column(db.Float, nullable=False)
    FE_LR_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    FE_SVM_HOME_W_PROB = db.Column(db.Float, nullable=False)
    FE_SVM_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    FE_GNB_HOME_W_PROB = db.Column(db.Float, nullable=False)
    FE_GNB_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    FE_GB_HOME_W_PROB = db.Column(db.Float, nullable=False)
    FE_GB_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    FE_DT_HOME_W_PROB = db.Column(db.Float, nullable=False)
    FE_DT_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    FE_KNN_HOME_W_PROB = db.Column(db.Float, nullable=False)
    FE_KNN_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    FE_MLP_HOME_W_PROB = db.Column(db.Float, nullable=False)
    FE_MLP_AWAY_W_PROB = db.Column(db.Float, nullable=False)
    FE_RF_HOME_W_PROB = db.Column(db.Float, nullable=False)
    FE_RF_AWAY_W_PROB = db.Column(db.Float, nullable=False)

    gameteams = db.relationship('NBAGameIds', back_populates='pred')


class NBAGameIds(db.Model):
    __tablename__ = 'nbagameids'
    GAME_ID = db.Column(db.Integer, primary_key=True)
    GAME_DATE = db.Column(db.String(50), nullable=False)
    HOME_TEAM_ID = db.Column(db.Integer, db.ForeignKey(
        'nbateams.TEAM_ID'), nullable=False)
    AWAY_TEAM_ID = db.Column(db.Integer, db.ForeignKey(
        'nbateams.TEAM_ID'), nullable=False)

    # Relationship to home team and away team
    home_team = db.relationship('NBATeam', foreign_keys=[HOME_TEAM_ID], backref='home_games', lazy='joined')
    away_team = db.relationship('NBATeam', foreign_keys=[AWAY_TEAM_ID], backref='away_games', lazy='joined')

    Matchups = db.relationship(
        'NBAGameLogs', foreign_keys='NBAGameLogs.GAME_ID', backref='LOG_REF', lazy='dynamic')

    #log = db.relationship('NBAGameLogs', back_populates='game')

    pred = db.relationship('NBAPredictions', back_populates='gameteams')



class NFLTeam(db.Model):
    __tablename__ = 'nfl_teams'
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
    __tablename__ = 'nfl_players'
    # Primary key and foreign key
    PLAYER_ID = db.Column(db.String(25), primary_key=True) 
    # Team reference
    TEAM_ID = db.Column(db.Integer, db.ForeignKey('nfl_teams.TEAM_ID'), nullable=False) 
    # Other fields
    SEASON = db.Column(db.Integer, nullable=False)
    TEAM = db.Column(db.String(20), nullable=False)
    PLAYER_NAME = db.Column(db.String(100), nullable=False)
    FIRST_NAME = db.Column(db.String(50), nullable=False)
    LAST_NAME = db.Column(db.String(50), nullable=False)
    POSITION = db.Column(db.String(10), nullable=False)
    STATUS = db.Column(db.String(20), nullable=True)
    GAME_TYPE = db.Column(db.String(20), nullable=True)

    # Relationships
    team_ref = db.relationship('NFLTeam', backref=db.backref('players', lazy=True)) 

    # One-to-many relationship to quarterback weekly stats
    weekly_stats = db.relationship(
        'NFLQuarterbackWeeklyStats',
        back_populates='PLAYER',
        cascade='all, delete-orphan'
    )

    def __repr__(self):
        return f"<Player {self.PLAYER_NAME} ({self.TEAM.team_name})>"
    
class NFLQuarterbackWeeklyStats(db.Model):
    __tablename__ = 'nfl_qb_weekly_stats'

    STAT_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Foreign key relationship to NFLPlayer
    PLAYER_ID = db.Column(db.String(25), db.ForeignKey('nfl_players.PLAYER_ID'), nullable=False)
    PLAYER =  db.relationship('NFLPlayer', back_populates='weekly_stats')

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

class NFLReceivingWeeklyStats(db.Model):
    __tablename__ = 'nfl_receiving_weekly_stats'

    STAT_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Foreign key relationship to NFLPlayer
    PLAYER_ID = db.Column(db.String(25), db.ForeignKey('nfl_players.PLAYER_ID'), nullable=False)
    PLAYER = db.relationship('NFLPlayer', back_populates='receiving_stats')

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

    # Receiving Stats
    RECEPTIONS = db.Column(db.Integer, nullable=True)
    TARGETS = db.Column(db.Integer, nullable=True)
    RECEIVING_YARDS = db.Column(db.Integer, nullable=True)
    RECEIVING_TDS = db.Column(db.Integer, nullable=True)
    RECEIVING_FUMBLES = db.Column(db.Integer, nullable=True)
    RECEIVING_FUMBLES_LOST = db.Column(db.Integer, nullable=True)
    RECEIVING_AIR_YARDS = db.Column(db.Float, nullable=True)
    RECEIVING_YARDS_AFTER_CATCH = db.Column(db.Float, nullable=True)
    RECEIVING_FIRST_DOWNS = db.Column(db.Integer, nullable=True)
    RECEIVING_EPA = db.Column(db.Float, nullable=True)
    RECEIVING_2PT_CONVERSIONS = db.Column(db.Integer, nullable=True)

    # Advanced Receiving Metrics
    RACR = db.Column(db.Float, nullable=True)
    TARGET_SHARE = db.Column(db.Float, nullable=True)
    AIR_YARDS_SHARE = db.Column(db.Float, nullable=True)
    WOPR = db.Column(db.Float, nullable=True)

    # Special Teams & Fantasy
    SPECIAL_TEAMS_TDS = db.Column(db.Integer, nullable=True)
    FANTASY_POINTS = db.Column(db.Float, nullable=True)
    FANTASY_POINTS_PPR = db.Column(db.Float, nullable=True)

    # Extra Advanced Receiving Metrics
    RECEIVING_BROKEN_TACKLES = db.Column(db.Integer, nullable=True)
    RECEIVING_DROP = db.Column(db.Integer, nullable=True)
    RECEIVING_DROP_PCT = db.Column(db.Float, nullable=True)
    RECEIVING_INT = db.Column(db.Integer, nullable=True)
    RECEIVING_RAT = db.Column(db.Float, nullable=True)

    # Tracking Metrics
    AVG_CUSHION = db.Column(db.Float, nullable=True)
    AVG_SEPARATION = db.Column(db.Float, nullable=True)
    AVG_INTENDED_AIR_YARDS = db.Column(db.Float, nullable=True)
    PERCENT_SHARE_OF_INTENDED_AIR_YARDS = db.Column(db.Float, nullable=True)
    AVG_YAC = db.Column(db.Float, nullable=True)
    AVG_EXPECTED_YAC = db.Column(db.Float, nullable=True)
    AVG_YAC_ABOVE_EXPECTATION = db.Column(db.Float, nullable=True)

    def __repr__(self):
        return f"<ReceivingStats {self.PLAYER_NAME} - Week {self.WEEK}, Season {self.SEASON}>"



    





