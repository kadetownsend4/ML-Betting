"""
    File responsible for the intialization and creation of our database models. This file 
    contains all of the classes which define the constraints of our database tables. Whenever 
    we needed to change the models, we changed the code in these classes and intialized a migration
    to update the SQL tables

    The video below discussed how to intialize and deploy a Flask app connected to a 
    PostgreSQL database and laid the foundation for the set up of our flask application
    and database intialization. This was one of the foundational files for the application.

    Video reference: https://www.youtube.com/watch?v=IBfj_0Zf2Mo 

    Tim: 
    I got help from ChatGPT for setting up this model. My process for speeding up model creation
    was providing ChatGPT with my csv headers to give it an understanding of the data which will be imported.
    I told it to make a model using these columns as the fields of the model. It typically made a few mistakes, 
    with setting up the key's and constraints but I would go back in and edit those. These saved me lots of 
    time when creating the models. These conversations occured over different chats. The links are within the 
    header comments under the class. 

    authors = Timothy Berlanga and Kade Townsend 
""" 

from datetime import datetime
from .extensions import db 
from sqlalchemy import PrimaryKeyConstraint

# Necessary security imports for user password management 
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    """
        User model for storing user data, including username, email, and password hash.
        
        I got help from ChatGPT for setting up this model. This was the original model which I made to 
        test the flask application's functionality and how it works. I created login and registration forms 
        in the templates to test our this model and how our application interacted with the DB.

        Chat Link: https://chatgpt.com/share/67e49261-fcfc-800f-a302-03d2a6125d48 

        Methods:
        - set_password(password): Hashes and stores the password.
        - check_password(password): Verifies the hashed password.
    """
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


class NBATeam(db.Model):
    """
        NBA Team model which stores basic information about the team such as the 
        team id, name, logo, etc. Utilized by the nba teams route and many of the routes
        returning team prediciton data to make access easier to team information easier. 

    """
    __tablename__ = 'nbateams'
    TEAM_ID = db.Column(db.Integer, primary_key=True)
    TEAM_NAME = db.Column(db.String(50), nullable=False)
    TEAM_ABR = db.Column(db.String(50), nullable=False)
    TEAM_NICKNAME = db.Column(db.String(50), nullable=False)
    TEAM_CITY = db.Column(db.String(50), nullable=False)
    TEAM_STATE = db.Column(db.String(50), nullable=False)
    TEAM_YEAR_FOUNDED = db.Column(db.Integer, nullable=False)
    TEAM_LOGO = db.Column(db.String(75), nullable=False)


    # I was having issues with the db due to the initial relationship contraints of this model. I asked ChatGPT for help understanding
    # the error and fixing the relationship. - Tim
    # Chat Link: https://chatgpt.com/share/680bc023-a7f4-800f-ad6f-91c87a88a1f5
    HOME_GAMES = db.relationship(
    'NBAGameIds',
    foreign_keys='NBAGameIds.HOME_TEAM_ID',
    back_populates='home_team',
    lazy='dynamic',
    overlaps="home_team,HOME_TEAM_REF"
    )

    AWAY_GAMES = db.relationship(
        'NBAGameIds',
        foreign_keys='NBAGameIds.AWAY_TEAM_ID',
        back_populates='away_team',
        lazy='dynamic',
        overlaps="away_team,AWAY_TEAM_REF"
    )

class NBATeamStats(db.Model):
    """
        NBA Team Game Stats model which stores the performance statistics associated with a specific team and game. 
        It contains a FK reference to team as the stats are associated with a specfic team.

    """
    __tablename__ = 'nbateamstats'

    id = db.Column(db.Integer, primary_key=True)
    TEAM_ID = db.Column(db.Integer, db.ForeignKey('nbateams.TEAM_ID'), nullable=False)
    TEAM = db.Column(db.String(50), nullable=False)
    SEASON = db.Column(db.String(50), nullable=False)


    GP = db.Column(db.Integer)             # Games Played
    W = db.Column(db.Integer)              # Wins
    L = db.Column(db.Integer)              # Losses
    WIN_PCT = db.Column(db.Float)          # Win Percentage
    Min = db.Column(db.Float)              # Minutes
    PTS = db.Column(db.Float)              # Points
    FGM = db.Column(db.Float)              # Field Goals Made
    FGA = db.Column(db.Float)              # Field Goals Attempted
    FG_PCT = db.Column(db.Float)           # Field Goal %
    THREE_PM = db.Column(db.Float)         # 3 Point Made (renamed from "3:00 PM")
    THREE_PA = db.Column(db.Float)         # 3 Point Attempted
    THREE_PCT = db.Column(db.Float)        # 3 Point %
    FTM = db.Column(db.Float)              # Free Throws Made
    FTA = db.Column(db.Float)              # Free Throws Attempted
    FT_PCT = db.Column(db.Float)           # Free Throw %
    OREB = db.Column(db.Float)             # Offensive Rebounds
    DREB = db.Column(db.Float)             # Defensive Rebounds
    REB = db.Column(db.Float)              # Total Rebounds
    AST = db.Column(db.Float)              # Assists
    TOV = db.Column(db.Float)              # Turnovers
    STL = db.Column(db.Float)              # Steals
    BLK = db.Column(db.Float)              # Blocks
    BLKA = db.Column(db.Float)             # Blocks Against
    PF = db.Column(db.Float)               # Personal Fouls
    PFD = db.Column(db.Float)              # Personal Fouls Drawn
    PLUS_MINUS = db.Column(db.Float)       # Plus/Minus

    team = db.relationship('NBATeam', backref=db.backref('stats', lazy=True))


class NBAGameLogs(db.Model):
    """
        NBA Team Game Stats model which stores the performance statistics associated with a specific team and game. Each game id has
        two teams associated with it. In the game logs table, one entry of a game id is for the home team and one entry of the game id 
        is for the away team. 

    """
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

    # Creates a primary key which is a combination of the game id and team id to obtain a primary key which would 
    # be able to correctly identify all entries in this table 
    __table_args__ = (
        PrimaryKeyConstraint('GAME_ID', 'TEAM_ID', name='pk_game_team'),
    )

    # Predictions = db.relationship(
    #     'NBAGameIds', foreign_keys='NBAGameIds.GAME_ID', backref='GAME_REF', lazy='dynamic')


class NBAPredictions(db.Model):
    """
        NBA Team Predictions model whcih stores the predictions associated with a particular game. It contains all possible 
        predictions from all feature set and model combinations. It has a reference to game id as predicitions are made for specifics games.

    """
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
    """
        NBA Game Ids models to store the game id with the associated game date and home/away team ids. It also contains relationships to
        the game logs and predictions.

    """
    __tablename__ = 'nbagameids'
    GAME_ID = db.Column(db.Integer, primary_key=True)
    GAME_DATE = db.Column(db.String(50), nullable=False)
    HOME_TEAM_ID = db.Column(db.Integer, db.ForeignKey(
        'nbateams.TEAM_ID'), nullable=False)
    AWAY_TEAM_ID = db.Column(db.Integer, db.ForeignKey(
        'nbateams.TEAM_ID'), nullable=False)


    # I was having issues with the db due to the initial relationship contraints of this model. I asked ChatGPT for help understanding
    # the error and fixing the relationship. - Tim
    # Chat Link: https://chatgpt.com/share/680bc023-a7f4-800f-ad6f-91c87a88a1f5
    home_team = db.relationship(
    'NBATeam',
    foreign_keys=[HOME_TEAM_ID],
    back_populates='HOME_GAMES',
    lazy='joined',
    overlaps="home,HOME_TEAM_REF"
    )

    away_team = db.relationship(
        'NBATeam',
        foreign_keys=[AWAY_TEAM_ID],
        back_populates='AWAY_GAMES',
        lazy='joined',
        overlaps="AWAY_GAMES,AWAY_TEAM_REF"
    )


    Matchups = db.relationship(
        'NBAGameLogs', foreign_keys='NBAGameLogs.GAME_ID', backref='LOG_REF', lazy='dynamic')

    #log = db.relationship('NBAGameLogs', back_populates='game')

    pred = db.relationship('NBAPredictions', back_populates='gameteams')

class NFLTeam(db.Model):
    """
        NFL Team model which stores basic information about the team such as the 
        team id, name, logo, etc. Utilized by the nfl teams route and many of the routes
        returning team data to make access of their information to display easier when 
        returning their schedule or players. 
        
        Chat Link: https://chatgpt.com/share/67e49261-fcfc-800f-a302-03d2a6125d48 
    """
    __tablename__ = 'nfl_teams'
    TEAM_ID = db.Column(db.Integer, primary_key=True)
    TEAM_NAME = db.Column(db.String(50), unique=True, nullable=False)
    TEAM_ABR = db.Column(db.String(10), unique=True, nullable=False)
    TEAM_NICKNAME = db.Column(db.String(50), unique=True, nullable=False)
    TEAM_CONF = db.Column(db.String(50), nullable=False)
    TEAM_DIVISION = db.Column(db.String(50), nullable=False)
    TEAM_LOGO = db.Column(db.String(128), nullable=False)
    TEAM_WORDMARK = db.Column(db.String(128), nullable=False)
    

class NFLGames(db.Model):
    """
       NFL Game model which stores the bare minimum information associated with an NFL games, 
       being the game id, teams, home and away score, and week. It contains references to the home 
       and away team. 

       Chat Link: https://chatgpt.com/share/67e49261-fcfc-800f-a302-03d2a6125d48 
    """
    __tablename__ = "nfl_game_schedule"

    GAME_ID = db.Column(db.String(25), primary_key=True)
    
    HOME_TEAM = db.Column(db.String(10), db.ForeignKey('nfl_teams.TEAM_ABR'))
    AWAY_TEAM = db.Column(db.String(10), db.ForeignKey('nfl_teams.TEAM_ABR'))

    HOME_SCORE = db.Column(db.Integer)
    AWAY_SCORE = db.Column(db.Integer)
    WEEK = db.Column(db.Integer)

    # Relationships
    home_team_ref = db.relationship('NFLTeam', foreign_keys=[HOME_TEAM], backref='home_games')
    away_team_ref = db.relationship('NFLTeam', foreign_keys=[AWAY_TEAM], backref='away_games')

class NFLTeamGameStats(db.Model):
    """
        NFL Team Game Stats model which stores a team's performance statistics associated with a specific 
        game. Utilized to return specfic stats for a specfic game and team. This is used when displaying
        the game page associated with the schedule. It contains a reference to the team on team abr and 
        the game on game id.
    
        Chat Link: https://chatgpt.com/share/68000cf1-1714-800f-a0b5-4afc3d924474
    """
    __tablename__ = 'nfl_team_game_stats'

    # Columns used for identification of game, team, and week
    STAT_ID = db.Column(db.Integer, primary_key=True)
    TEAM = db.Column(db.String(25), db.ForeignKey('nfl_teams.TEAM_ABR'), nullable=False)
    GAME_ID = db.Column(db.String(25), db.ForeignKey('nfl_game_schedule.GAME_ID'), nullable=False)
    WEEK = db.Column(db.Integer, nullable=False)
    
    # Statistics Columns
    TOTAL_YARDS = db.Column(db.Integer)
    TOTAL_TDS = db.Column(db.Integer)
    PASSING_TDS = db.Column(db.Integer)
    RUSHING_TDS = db.Column(db.Integer)
    NUM_PLAYS = db.Column(db.Integer)
    AVG_EPA = db.Column(db.Float)
    SUCCESS_RATE = db.Column(db.Float)
    TOTAL_RUSH_YARDS = db.Column(db.Integer)
    RUSH_ATTEMPTS = db.Column(db.Integer)
    LONGEST_RUSH = db.Column(db.Integer)
    RUSHES_FOR_LOSS = db.Column(db.Integer)
    TOTAL_PASS_YARDS = db.Column(db.Integer)
    PASS_ATTEMPTS = db.Column(db.Integer)
    COMPLETE_PASSES = db.Column(db.Integer)
    INCOMPLETE_PASSES = db.Column(db.Integer)
    SACKS = db.Column(db.Integer)
    LONGEST_PASS = db.Column(db.Integer)
    TOTAL_PENALTY_YARDS = db.Column(db.Integer)
    FUMBLES_LOST = db.Column(db.Integer)
    INTERCEPTIONS = db.Column(db.Integer)
    THIRD_DOWN_CONVERTED = db.Column(db.Integer)
    FOURTH_DOWN_CONVERTED = db.Column(db.Integer)
    WP = db.Column(db.Float)  # Win Probability
    HOME_WP = db.Column(db.Float)  # Home Team Win Probability
    AWAY_WP = db.Column(db.Float)  # Away Team Win Probability

    # Relationships
    team = db.relationship('NFLTeam', backref='team_stats', lazy=True)
    game = db.relationship('NFLGames', backref='game_stats', lazy=True)



class NFLPlayer(db.Model):
    """
        NFL Player model which stores the basic information about a player such as the 
        player id, team id, team, name, position, season, etc. This table was utilized to 
        figure out which players are on each team based on team id. It contains a one to many relationship


        Chat Link: https://chatgpt.com/share/67e49261-fcfc-800f-a302-03d2a6125d48 
    """
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
    passing_stats = db.relationship(
        'NFLQuarterbackWeeklyStats',
        back_populates='PLAYER',
        cascade='all, delete-orphan'
    )

    # One-to-many relationship to receiving weekly stats
    receiving_stats = db.relationship(
        'NFLReceivingWeeklyStats',
        back_populates='PLAYER',
        cascade='all, delete-orphan'
    )

      # One-to-many relationship to receiving weekly stats
    running_stats = db.relationship(
        'NFLRBWeeklyStats',
        back_populates='PLAYER',
        cascade='all, delete-orphan'
    )
    
class NFLQuarterbackWeeklyStats(db.Model):
    """
        NFL QB Weekly stats model which stores a QB's performance statistics associated with a specfic 
        player, game, and week. It has references to the NFL players model as each player has many weekly stats.
        It also has stores the game id column which can be used to get QB data from a specfic game.

        This table the following data for each week a QB played and had sufficient data from the API's:
            - General Info 
            - Passing Stats 
            - Rushing Stats 
            - Fantasy Metrics 
            - Advanced Passing Metrics
            - Rushing Advanced 
            - Snap Count 
            - Air Yards and Aggressiveness
            - Completion and efficiency 

        Chat Link: https://chatgpt.com/share/67f2ff4f-8674-800f-a8d8-a860adcabf77
    """
    __tablename__ = 'nfl_qb_weekly_stats'

    STAT_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Foreign key relationship to NFLPlayer
    PLAYER_ID = db.Column(db.String(25), db.ForeignKey('nfl_players.PLAYER_ID'), nullable=False)
    PLAYER =  db.relationship('NFLPlayer', back_populates='passing_stats')

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


class NFLReceivingWeeklyStats(db.Model):
    """
        NFL Recieving Weekly stats model which stores a Reciever's performance statistic's associated with a specfic 
        player, game, and week. It has references to the NFL players model as each player has many weekly stats.
        It also has stores the game id column which can be used to get Recieving data from a specfic game. 

        This table the following data for each week a WR and TE data for players who had sufficient data from the API's:
            - General Info 
            - Recieving Stats 
            - Advanced Recieving Metrics
            - Special Team & Fantasy
            - Extra Advanced Metrics 
            - Tracking Metrics
            
        Chat Link: https://chatgpt.com/share/680bc023-a7f4-800f-ad6f-91c87a88a1f5 
    """
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

class NFLRBWeeklyStats(db.Model):
    """
        NFL Runningback Weekly stats model which stores a Runningback's performance statistic's associated with a specfic 
        player, game, and week. It has references to the NFL players model as each player has many weekly stats.
        It also has stores the game id column which can be used to get Rushing data from a specfic game. 

        This table the following data for each week a RB data for players who had sufficient data from the API's:
            - General Info 
            - Rushing Stats 
            - Recieving Stats 
            - Fantasy 
            - Advanced Rushing Metrics 

        Chat Link: https://chatgpt.com/share/67f2ff4f-8674-800f-a8d8-a860adcabf77
    """
    __tablename__ = 'nfl_rb_weekly_stats'

    STAT_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Foreign key relationship to NFLPlayer
    PLAYER_ID = db.Column(db.String(25), db.ForeignKey('nfl_players.PLAYER_ID'), nullable=False)
    PLAYER = db.relationship('NFLPlayer', back_populates='running_stats')

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

    # Rushing Stats
    CARRIES = db.Column(db.Integer, nullable=True)
    RUSHING_YARDS = db.Column(db.Integer, nullable=True)
    RUSHING_TDS = db.Column(db.Integer, nullable=True)
    RUSHING_FUMBLES = db.Column(db.Integer, nullable=True)
    RUSHING_FUMBLES_LOST = db.Column(db.Integer, nullable=True)
    RUSHING_FIRST_DOWNS = db.Column(db.Integer, nullable=True)
    RUSHING_EPA = db.Column(db.Float, nullable=True)
    RUSHING_2PT_CONVERSIONS = db.Column(db.Integer, nullable=True)

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

    # Fantasy
    FANTASY_POINTS = db.Column(db.Float, nullable=True)
    FANTASY_POINTS_PPR = db.Column(db.Float, nullable=True)

    # Advanced Rushing Metrics
    RUSHING_YARDS_BEFORE_CONTACT = db.Column(db.Float, nullable=True)
    RUSHING_YARDS_BEFORE_CONTACT_AVG = db.Column(db.Float, nullable=True)
    RUSHING_YARDS_AFTER_CONTACT = db.Column(db.Float, nullable=True)
    RUSHING_YARDS_AFTER_CONTACT_AVG = db.Column(db.Float, nullable=True)
    RUSHING_BROKEN_TACKLES = db.Column(db.Integer, nullable=True)
    EFFICIENCY = db.Column(db.Float, nullable=True)
    PERCENT_ATTEMPTS_GTE_EIGHT_DEFENDERS = db.Column(db.Float, nullable=True)
    AVG_TIME_TO_LOS = db.Column(db.Float, nullable=True)
    EXPECTED_RUSH_YARDS = db.Column(db.Float, nullable=True)
    RUSH_YARDS_OVER_EXPECTED = db.Column(db.Float, nullable=True)
    RUSH_YARDS_OVER_EXPECTED_PER_ATT = db.Column(db.Float, nullable=True)
    RUSH_PCT_OVER_EXPECTED = db.Column(db.Float, nullable=True)



