from myapp import create_app
import os
import csv
from flask import Flask
from myapp.extensions import db
from myapp.models import NFLTeam, NFLPlayer, NFLQuarterbackWeeklyStats

app = create_app()
target_metadata = db.metadata

def upload_qb_weekly_stats(file_path):
    with app.app_context():
        with open(file_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)

            for row in reader:
                stat = NFLQuarterbackWeeklyStats(
                    PLAYER_ID=row.get('player_id'),
                    PLAYER_NAME=row.get('player_name'),
                    PLAYER_ABBR=row.get('player_abbr'),
                    GAME_ID=row.get('game_id'),
                    WEEK=safe_int(row.get('week')),
                    RECENT_TEAM=row.get('recent_team'),
                    OPPONENT_TEAM=row.get('opponent_team'),
                    SEASON=safe_int(row.get('season')),
                    SEASON_TYPE=row.get('season_type'),
                    POSITION=row.get('position'),
                    HEADSHOT_URL=row.get('headshot_url'),
                    COMPLETIONS=safe_float(row.get('completions')),
                    ATTEMPTS=safe_float(row.get('attempts')),
                    PASSING_YARDS=safe_float(row.get('passing_yards')),
                    PASSING_TDS=safe_float(row.get('passing_tds')),
                    INTERCEPTIONS=safe_float(row.get('interceptions')),
                    SACKS=safe_float(row.get('sacks')),
                    SACK_YARDS=safe_float(row.get('sack_yards')),
                    SACK_FUMBLES=safe_float(row.get('sack_fumbles')),
                    SACK_FUMBLES_LOST=safe_float(row.get('sack_fumbles_lost')),
                    PASSING_AIR_YARDS=safe_float(row.get('passing_air_yards')),
                    PASSING_YARDS_AFTER_CATCH=safe_float(row.get('passing_yards_after_catch')),
                    PASSING_FIRST_DOWNS=safe_float(row.get('passing_first_downs')),
                    PASSING_EPA=safe_float(row.get('passing_epa')),
                    PASSING_2PT_CONVERSIONS=safe_float(row.get('passing_2pt_conversions')),
                    PACR=safe_float(row.get('pacr')),
                    DAKOTA=safe_float(row.get('dakota')),
                    CARRIES=safe_float(row.get('carries')),
                    RUSHING_YARDS=safe_float(row.get('rushing_yards')),
                    RUSHING_TDS=safe_float(row.get('rushing_tds')),
                    RUSHING_FUMBLES=safe_float(row.get('rushing_fumbles')),
                    RUSHING_FUMBLES_LOST=safe_float(row.get('rushing_fumbles_lost')),
                    RUSHING_FIRST_DOWNS=safe_float(row.get('rushing_first_downs')),
                    RUSHING_EPA=safe_float(row.get('rushing_epa')),
                    SPECIAL_TEAMS_TDS=safe_float(row.get('special_teams_tds')),
                    FANTASY_POINTS=safe_float(row.get('fantasy_points')),
                    FANTASY_POINTS_PPR=safe_float(row.get('fantasy_points_ppr')),
                    PASSING_DROPS=safe_float(row.get('passing_drops')),
                    PASSING_DROP_PCT=safe_float(row.get('passing_drop_pct')),
                    PASSING_BAD_THROWS=safe_float(row.get('passing_bad_throws')),
                    PASSING_BAD_THROW_PCT=safe_float(row.get('passing_bad_throw_pct')),
                    TIMES_SACKED=safe_float(row.get('times_sacked')),
                    TIMES_BLITZED=safe_float(row.get('times_blitzed')),
                    TIMES_HURRIED=safe_float(row.get('times_hurried')),
                    TIMES_HIT=safe_float(row.get('times_hit')),
                    TIMES_PRESSURED=safe_float(row.get('times_pressured')),
                    TIMES_PRESSURED_PCT=safe_float(row.get('times_pressured_pct')),
                    RUSHING_YARDS_BEFORE_CONTACT=safe_float(row.get('rushing_yards_before_contact')),
                    RUSHING_YARDS_BEFORE_CONTACT_AVG=safe_float(row.get('rushing_yards_before_contact_avg')),
                    RUSHING_YARDS_AFTER_CONTACT=safe_float(row.get('rushing_yards_after_contact')),
                    RUSHING_YARDS_AFTER_CONTACT_AVG=safe_float(row.get('rushing_yards_after_contact_avg')),
                    RUSHING_BROKEN_TACKLES=safe_float(row.get('rushing_broken_tackles')),
                    OFFENSE_SNAPS=safe_float(row.get('offense_snaps')),
                    OFFENSE_PCT=safe_float(row.get('offense_pct')),
                    PLAYER_POSITION=row.get('player_position'),
                    AVG_TIME_TO_THROW=safe_float(row.get('avg_time_to_throw')),
                    AVG_COMPLETED_AIR_YARDS=safe_float(row.get('avg_completed_air_yards')),
                    AVG_INTENDED_AIR_YARDS=safe_float(row.get('avg_intended_air_yards')),
                    AVG_AIR_YARDS_DIFFERENTIAL=safe_float(row.get('avg_air_yards_differential')),
                    AGGRESSIVENESS=safe_float(row.get('aggressiveness')),
                    MAX_COMPLETED_AIR_DISTANCE=safe_float(row.get('max_completed_air_distance')),
                    AVG_AIR_YARDS_TO_STICKS=safe_float(row.get('avg_air_yards_to_sticks')),
                    PASSER_RATING=safe_float(row.get('passer_rating')),
                    COMPLETION_PERCENTAGE=safe_float(row.get('completion_percentage')),
                    EXPECTED_COMPLETION_PERCENTAGE=safe_float(row.get('expected_completion_percentage')),
                    COMPLETION_PERCENTAGE_ABOVE_EXPECTATION=safe_float(row.get('completion_percentage_above_expectation')),
                    AVG_AIR_DISTANCE=safe_float(row.get('avg_air_distance')),
                    MAX_AIR_DISTANCE=safe_float(row.get('max_air_distance'))
                )
                db.session.add(stat)

            db.session.commit()
            print("✅ QB weekly stats uploaded successfully!")


# Helpers to safely convert strings to numbers
def safe_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return None

def safe_float(value):
    try:
        return float(value)
    except (ValueError, TypeError):
        return None

upload_qb_weekly_stats('team_data.csv')

with app.app_context():
     upload_qb_weekly_stats('team_data.csv')
