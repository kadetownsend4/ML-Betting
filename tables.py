from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class NBATeam(db.Model):
    TEAM_ID = db.Column(db.Integer, primary_key=True)
