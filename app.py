from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, render_template
import os
from sqlalchemy.sql import text
from sqlalchemy import select
from sqlalchemy.orm import aliased
from slugify import slugify


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

    #game = db.relationship('NBAGameIds', back_populates='log')

    Predictions = db.relationship(
        'NBAGameIds', foreign_keys='NBAGameIds.GAME_ID', backref='GAME_REF', lazy='dynamic')


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
    GAME_ID = db.Column(db.Integer, db.ForeignKey(
        'nbagamelogs.GAME_ID'), primary_key=True)
    GAME_DATE = db.Column(db.String(50), nullable=False)
    HOME_TEAM_ID = db.Column(db.Integer, db.ForeignKey(
        'nbateams.TEAM_ID'), nullable=False)
    AWAY_TEAM_ID = db.Column(db.Integer, db.ForeignKey(
        'nbateams.TEAM_ID'), nullable=False)

    Matchups = db.relationship(
        'NBAGameLogs', foreign_keys='NBAGameLogs.GAME_ID', backref='LOG_REF', lazy='dynamic')

    #log = db.relationship('NBAGameLogs', back_populates='game')

    pred = db.relationship('NBAPredictions', back_populates='gameteams')


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
    return jsonify(team_data)


@app.route('/NBAMatchups/<team>')
def fetch_matchups(team):

    team_norm = team.replace('-', ' ')

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
        NBAGameLogs.NICKNAME == team_norm
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
    return jsonify(matchup_data)


@app.route('/NBAMatchups/<awayteam>/<hometeam>/<gameid>')
def fetch_matchup_stats(awayteam, hometeam, gameid):

    away_team_norm = awayteam.replace('-', ' ')
    home_team_norm = hometeam.replace('-', ' ')

    Home = aliased(NBAGameLogs)
    Away = aliased(NBAGameLogs)

    stats = db.session.query(
        Home.GAME_ID,
        Home.GAME_DATE,
        Home.W.label("HOME_W"),
        Home.FG_PCT.label("HOME_FG_PCT"),
        Home.FG3_PCT.label("HOME_FG3_PCT"),
        Home.FT_PCT.label("HOME_FT_PCT"),
        Home.TOT_REB.label("HOME_TOT_REB"),
        Home.AST.label("HOME_AST"),
        Home.PF.label("HOME_PF"),
        Home.STL.label("HOME_STL"),
        Home.TOTAL_TURNOVERS.label("HOME_TOTAL_TURNOVERS"),
        Home.BLK.label("HOME_BLK"),
        Home.PTS.label("HOME_PTS"),

        Away.W.label("AWAY_W"),
        Away.FG_PCT.label("AWAY_FG_PCT"),
        Away.FG3_PCT.label("AWAY_FG3_PCT"),
        Away.FT_PCT.label("AWAY_FT_PCT"),
        Away.TOT_REB.label("AWAY_TOT_REB"),
        Away.AST.label("AWAY_AST"),
        Away.PF.label("AWAY_PF"),
        Away.STL.label("AWAY_STL"),
        Away.TOTAL_TURNOVERS.label("AWAY_TOTAL_TURNOVERS"),
        Away.BLK.label("AWAY_BLK"),
        Away.PTS.label("AWAY_PTS"),
    ).join(
        Away, Home.GAME_ID == Away.GAME_ID
    ).filter(
        Home.CITY != "OPPONENTS",
        Away.CITY == "OPPONENTS",
        Home.GAME_ID == gameid
    ).first()

    stats_data = {
        'GAME_ID': stats.GAME_ID,
        'GAME_DATE': stats.GAME_DATE,
        'HOME_TEAM': {
            'NAME': home_team_norm,
            'W': stats.HOME_W,
            'FG_PCT': stats.HOME_FG_PCT,
            'FG3_PCT': stats.HOME_FG3_PCT,
            'FT_PCT': stats.HOME_FT_PCT,
            'TOT_REB': stats.HOME_TOT_REB,
            'AST': stats.HOME_AST,
            'PF': stats.HOME_PF,
            'STL': stats.HOME_STL,
            'TOTAL_TURNOVERS': stats.HOME_TOTAL_TURNOVERS,
            'BLK': stats.HOME_BLK,
            'PTS': stats.HOME_PTS,
        },
        'AWAY_TEAM': {
            'NAME': away_team_norm,
            'W': stats.AWAY_W,
            'FG_PCT': stats.AWAY_FG_PCT,
            'FG3_PCT': stats.AWAY_FG3_PCT,
            'FT_PCT': stats.AWAY_FT_PCT,
            'TOT_REB': stats.AWAY_TOT_REB,
            'AST': stats.AWAY_AST,
            'PF': stats.AWAY_PF,
            'STL': stats.AWAY_STL,
            'TOTAL_TURNOVERS': stats.AWAY_TOTAL_TURNOVERS,
            'BLK': stats.AWAY_BLK,
            'PTS': stats.AWAY_PTS,
        }
    }
    return jsonify(stats_data)


@app.route('/NBAPredictions/date/<date>/<feature>/<model>')
def fetch_predictions_by_date(date, feature, model):

    HomeTeam = aliased(NBATeam)
    AwayTeam = aliased(NBATeam)

    name_h = feature + "_" + model + "_HOME_W_PROB"
    name_a = feature + "_" + model + "_AWAY_W_PROB"

    home_probs = getattr(NBAPredictions, name_h)
    away_probs = getattr(NBAPredictions, name_a)

    predictions = db.session.query(
        NBAPredictions.GAME_ID,
        home_probs.label("home_probs"),
        away_probs.label("away_probs"),
        NBAGameIds,
        HomeTeam.TEAM_NAME.label("HOME_TEAM_NAME"),
        AwayTeam.TEAM_NAME.label("AWAY_TEAM_NAME")
    ).join(
        NBAGameIds, NBAPredictions.GAME_ID == NBAGameIds.GAME_ID
    ).join(
        HomeTeam, NBAGameIds.HOME_TEAM_ID == HomeTeam.TEAM_ID
    ).join(
        AwayTeam, NBAGameIds.AWAY_TEAM_ID == AwayTeam.TEAM_ID
    ).filter(
        NBAGameIds.GAME_DATE == date
    ).all()

    predictions_data = [
        {
            "GAME_ID": ID,
            "HOME_W_PROB": HOME_PROB,
            "AWAY_W_PROB": AWAY_PROB,
            "GAME_DATE": game.GAME_DATE,
            "HOME_TEAM": HOME_NAME,
            "AWAY_TEAM": AWAY_NAME
        }
        for ID, HOME_PROB, AWAY_PROB, game, HOME_NAME, AWAY_NAME in predictions
    ]
    return jsonify(predictions_data)


@app.route('/NBAPredictions/team/<team>/<feature>/<model>')
def fetch_predictions_by_team(team, feature, model):

    team_norm = team.replace('-', ' ')

    HomeTeam = aliased(NBATeam)
    AwayTeam = aliased(NBATeam)

    name_h = feature + "_" + model + "_HOME_W_PROB"
    name_a = feature + "_" + model + "_AWAY_W_PROB"

    home_probs = getattr(NBAPredictions, name_h)
    away_probs = getattr(NBAPredictions, name_a)

    predictions = db.session.query(
        NBAPredictions.GAME_ID,
        home_probs.label("home_probs"),
        away_probs.label("away_probs"),
        NBAGameIds,
        NBAGameLogs,
        HomeTeam.TEAM_NAME.label("HOME_TEAM_NAME"),
        AwayTeam.TEAM_NAME.label("AWAY_TEAM_NAME")
    ).join(
        NBAGameIds, NBAPredictions.GAME_ID == NBAGameIds.GAME_ID
    ).join(
        HomeTeam, NBAGameIds.HOME_TEAM_ID == HomeTeam.TEAM_ID
    ).join(
        AwayTeam, NBAGameIds.AWAY_TEAM_ID == AwayTeam.TEAM_ID
    ).join(
        NBAGameLogs, NBAGameIds.GAME_ID == NBAGameLogs.GAME_ID
    ).filter(
        NBAGameLogs.NICKNAME == team_norm
    ).order_by(NBAGameIds.GAME_DATE.desc()).all()

    predictions_data = [
        {
            "GAME_ID": ID,
            "HOME_W_PROB": HOME_PROB,
            "AWAY_W_PROB": AWAY_PROB,
            "GAME_DATE": game.GAME_DATE,
            "HOME_TEAM": HOME_NAME,
            "AWAY_TEAM": AWAY_NAME,
            "TEAM_W": log.W
        }
        for ID, HOME_PROB, AWAY_PROB, game, log, HOME_NAME, AWAY_NAME in predictions
    ]
    return jsonify(predictions_data)


if __name__ == '__main__':
    app.run(port=3000, debug=True)
