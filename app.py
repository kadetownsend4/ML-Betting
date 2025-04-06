from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, render_template
import os
from sqlalchemy.sql import text
from sqlalchemy import select
from sqlalchemy.orm import aliased


db = SQLAlchemy()
app = Flask(__name__)

user = os.environ.get('DB_USER')
pw = os.environ.get('DB_PW')
host = os.environ.get('DB_HOST')
port = "5432"
name = os.environ.get('DB_NAME')

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{user}:{pw}@{host}:{port}/{name}"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db.init_app(app)


class NBATeam(db.Model):
    __tablename__ = 'nbateams'
    TEAM_ID = db.Column(db.Integer, primary_key=True)
    TEAM_NAME = db.Column(db.String(50), nullable=False)
    TEAM_ABR = db.Column(db.String(50), nullable=False)
    TEAM_NICKNAME = db.Column(db.String(50), nullable=False)
    TEAM_CITY = db.Column(db.String(50), nullable=False)
    TEAM_STATE = db.Column(db.String(50), nullable=False)
    TEAM_YEAR_FOUNDED = db.Column(db.Integer, nullable=False)

    HOME_GAMES = db.relationship(
        'NBAGameIds', foreign_keys='NBAGameIds.HOME_TEAM_ID', backref='HOME_TEAM_REF', lazy='dynamic')
    AWAY_GAMES = db.relationship(
        'NBAGameIds', foreign_keys='NBAGameIds.AWAY_TEAM_ID', backref='AWAY_TEAM_REF', lazy='dynamic')


class NBAGameLogs(db.Model):
    __tablename__ = 'nbagamelogs'
    CITY = db.Column(db.String(50), nullable=False)
    NICKNAME = db.Column(db.String(50), nullable=False)
    TEAM_ID = db.Column(db.Integer, db.ForeignKey(
        'nbateams.TEAM_ID'), nullable=False)
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
        'nbagameids.GAME_ID'), primary_key=True)
    HOME_FLAG = db.Column(db.Integer, nullable=False)
    AWAY_FLAG = db.Column(db.Integer, nullable=False)
    HOME_WIN_PCTG = db.Column(db.Float, nullable=False)
    AWAY_WIN_PCTG = db.Column(db.Float, nullable=False)
    TOTAL_WIN_PCTG = db.Column(db.Float, nullable=False)
    ROLLING_SCORING_MARGIN = db.Column(db.Float, nullable=False)
    ROLLING_OE = db.Column(db.Float, nullable=False)
    NUM_REST_DAYS = db.Column(db.Float, nullable=False)

    game = db.relationship('NBAGameIds', back_populates='log')


class NBAPred(db.Model):
    __tablename__ = 'nbapred'
    SEASON = db.Column(db.String(50), nullable=False)
    GAME_ID = db.Column(db.Integer, db.ForeignKey(
        'nbagamelogs.GAME_ID'), nullable=False)
    GAME_DATE = db.Column(db.String(50), primary_key=True)
    HOME_W = db.Column(db.Integer, nullable=False)
    HOME_W_PRED = db.Column(db.Integer, nullable=False)
    AWAY_W_PROB = db.Column(db.Float, nullable=False)
    HOME_W_PROB = db.Column(db.Float, nullable=False)


class NBAGameIds(db.Model):
    __tablename__ = 'nbagameids'
    GAME_ID = db.Column(db.Integer, primary_key=True)
    GAME_DATE = db.Column(db.String(50), nullable=False)
    HOME_TEAM_ID = db.Column(db.Integer, db.ForeignKey(
        'nbateams.TEAM_ID'), nullable=False)
    AWAY_TEAM_ID = db.Column(db.Integer, db.ForeignKey(
        'nbateams.TEAM_ID'), nullable=False)

    log = db.relationship('NBAGameLogs', back_populates='game')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/NBATeams')
def fetch_teams():
    teams = db.session.query(NBATeam).all()

    team_data = [
        {
            "TEAM_ID": team.TEAM_ID,
            "TEAM_NAME": team.TEAM_NAME,
            "TEAM_ABR": team.TEAM_ABR,
            "TEAM_NICKNAME": team.TEAM_NICKNAME,
            "TEAM_CITY": team.TEAM_CITY,
            "TEAM_STATE": team.TEAM_STATE,
            "TEAM_YEAR_FOUNDED": team.TEAM_YEAR_FOUNDED,
        }
        for team in teams
    ]
    return team_data


@app.route('/NBAMatchups/<team>')
def fetch_matchups(team):

    HomeTeam = aliased(NBATeam)
    AwayTeam = aliased(NBATeam)

    matchups = db.session.query(
        NBAGameLogs,
        NBAGameIds,
        HomeTeam.TEAM_NAME.label("HOME_TEAM_NAME"),
        AwayTeam.TEAM_NAME.label("AWAY_TEAM_NAME")
    ).join(
        NBAGameIds, NBAGameLogs.GAME_ID == NBAGameIds.GAME_ID
    ).join(
        HomeTeam, NBAGameIds.HOME_TEAM_ID == HomeTeam.TEAM_ID
    ).join(
        AwayTeam, NBAGameIds.AWAY_TEAM_ID == AwayTeam.TEAM_ID
    ).filter(
        NBAGameLogs.NICKNAME == team
    ).order_by(NBAGameLogs.GAME_DATE.desc()).all()

    matchup_data = [
        {
            "CITY": log.CITY,
            "GAME_ID": log.GAME_ID,
            # "AWAY_ID": game.AWAY_TEAM_ID,
            # "HOME_ID": game.HOME_TEAM_ID,
            "DATE": game.GAME_DATE,
            "AWAY_TEAM": AWAY_NAME,
            "HOME_TEAM": HOME_NAME
        }
        for log, game, HOME_NAME, AWAY_NAME in matchups
    ]
    return matchup_data


@app.route('/NBAMatchups/<awayteam>/<hometeam>/<gameid>')
def fetch_matchup_stats(gameid):
    return "hello"


if __name__ == '__main__':
    app.run(port=3000, debug=True)
