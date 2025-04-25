from myapp import create_app
import os
import csv
from flask import Flask
from myapp.extensions import db
from myapp.models import NFLTeam, NFLPlayer, NFLQuarterbackWeeklyStats

app = create_app()
target_metadata = db.metadata

