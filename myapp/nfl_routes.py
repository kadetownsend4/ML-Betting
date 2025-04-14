# I asked chatgpt for help creating routes for our data based on the nfl models and how to set up a file for it 
# https://chatgpt.com/c/67fae20b-2284-800f-8915-68b334caed9f

from flask import Blueprint, jsonify, request
from .extensions import db
from .models import NFLQuarterbackWeeklyStats, NFLReceivingWeeklyStats, NFLTeam, NFLPlayer

nfl_stats_bp = Blueprint('nfl_stats', __name__)

@nfl_stats_bp.route('/nfl_teams', methods=['GET'])
def fetch_teams():
    # Fetch all teams from the NFLTeam table with only the required columns
    teams = NFLTeam.query.with_entities(
        NFLTeam.TEAM_ID,
        NFLTeam.TEAM_NAME,
        NFLTeam.TEAM_CONF,
        NFLTeam.TEAM_DIVISION,
        NFLTeam.TEAM_LOGO,
        NFLTeam.TEAM_WORDMARK
    ).all()

    # Convert the result into a list of dictionaries
    team_data = [
        {
            "TEAM_ID": team.TEAM_ID,
            "TEAM_NAME": team.TEAM_NAME,
            "TEAM_CONF": team.TEAM_CONF,
            "TEAM_DIVISION": team.TEAM_DIVISION,
            "TEAM_LOGO": team.TEAM_LOGO,
            "TEAM_WORDMARK": team.TEAM_WORDMARK,
        }
        for team in teams
    ]

    return jsonify(team_data)

@nfl_stats_bp.route('/nfl_teams/<int:team_id>/players', methods=['GET'])
def get_players_for_team(team_id):
    team = NFLTeam.query.get(team_id)
    if not team:
        return jsonify({'error': 'Team not found'}), 404

    players = NFLPlayer.query.filter_by(TEAM_ID=team_id).all()

    players_data = [
        {
            'PLAYER_ID': player.PLAYER_ID,
            'PLAYER_NAME': player.PLAYER_NAME,
            'FIRST_NAME': player.FIRST_NAME,
            'LAST_NAME': player.LAST_NAME,
            'POSITION': player.POSITION,
            'STATUS': player.STATUS,
            'GAME_TYPE': player.GAME_TYPE,
            'SEASON': player.SEASON
        }
        for player in players
    ]

    return jsonify({
        'team_id': team.TEAM_ID,
        'team_name': team.TEAM_NAME,
        'team_logo': team.TEAM_LOGO,
        'team_wordmark': team.TEAM_WORDMARK,
        'players': players_data
    })


# --- MERGED QB STATS ROUTE ---
@nfl_stats_bp.route('/qb/stats/<player_id>', methods=['GET'])
def get_full_qb_stats(player_id):
    stats = NFLQuarterbackWeeklyStats.query.filter_by(PLAYER_ID=player_id).all()
    
    data = []
    for s in stats:
        game_data = {
            # Core player/game info
            "PLAYER_NAME": s.PLAYER_NAME,
            "PLAYER_ABBR": s.PLAYER_ABBR,
            "GAME_ID": s.GAME_ID,
            "WEEK": s.WEEK,
            "RECENT_TEAM": s.RECENT_TEAM,
            "OPPONENT_TEAM": s.OPPONENT_TEAM,
            "SEASON": s.SEASON,
            "SEASON_TYPE": s.SEASON_TYPE,
            "POSITION": s.POSITION,
            "HEADSHOT_URL": s.HEADSHOT_URL,
            
            # Snap counts
            "OFFENSE_SNAPS": s.OFFENSE_SNAPS,
            "OFFENSE_PCT": s.OFFENSE_PCT,
            
            # Passing stats
            "COMPLETIONS": s.COMPLETIONS,
            "ATTEMPTS": s.ATTEMPTS,
            "PASSING_YARDS": s.PASSING_YARDS,
            "PASSING_TDS": s.PASSING_TDS,
            "INTERCEPTIONS": s.INTERCEPTIONS,
            "SACKS": s.SACKS,
            "SACK_YARDS": s.SACK_YARDS,
            "PASSING_EPA": s.PASSING_EPA,
            "PASSING_AIR_YARDS": s.PASSING_AIR_YARDS,
            "PASSING_YARDS_AFTER_CATCH": s.PASSING_YARDS_AFTER_CATCH,
            "PASSING_FIRST_DOWNS": s.PASSING_FIRST_DOWNS,
            "PACR": s.PACR,
            "DAKOTA": s.DAKOTA,
            "PASSER_RATING": s.PASSER_RATING,
            "COMPLETION_PERCENTAGE": s.COMPLETION_PERCENTAGE,
            "FANTASY_POINTS": s.FANTASY_POINTS,
            "FANTASY_POINTS_PPR": s.FANTASY_POINTS_PPR,

            # Rushing stats
            "CARRIES": s.CARRIES,
            "RUSHING_YARDS": s.RUSHING_YARDS,
            "RUSHING_TDS": s.RUSHING_TDS,
            "RUSHING_FUMBLES": s.RUSHING_FUMBLES,
            "RUSHING_FUMBLES_LOST": s.RUSHING_FUMBLES_LOST,
            "RUSHING_FIRST_DOWNS": s.RUSHING_FIRST_DOWNS,
            "RUSHING_EPA": s.RUSHING_EPA,
            "RUSHING_YARDS_BEFORE_CONTACT": s.RUSHING_YARDS_BEFORE_CONTACT,
            "RUSHING_YARDS_AFTER_CONTACT": s.RUSHING_YARDS_AFTER_CONTACT,
            "RUSHING_BROKEN_TACKLES": s.RUSHING_BROKEN_TACKLES,

            # Advanced + pressure metrics
            "PASSING_DROPS": s.PASSING_DROPS,
            "PASSING_DROP_PCT": s.PASSING_DROP_PCT,
            "PASSING_BAD_THROWS": s.PASSING_BAD_THROWS,
            "PASSING_BAD_THROW_PCT": s.PASSING_BAD_THROW_PCT,
            "AVG_TIME_TO_THROW": s.AVG_TIME_TO_THROW,
            "AVG_COMPLETED_AIR_YARDS": s.AVG_COMPLETED_AIR_YARDS,
            "AVG_INTENDED_AIR_YARDS": s.AVG_INTENDED_AIR_YARDS,
            "AVG_AIR_YARDS_DIFFERENTIAL": s.AVG_AIR_YARDS_DIFFERENTIAL,
            "AGGRESSIVENESS": s.AGGRESSIVENESS,
            "AVG_AIR_YARDS_TO_STICKS": s.AVG_AIR_YARDS_TO_STICKS,
            "AVG_AIR_DISTANCE": s.AVG_AIR_DISTANCE,
            "MAX_AIR_DISTANCE": s.MAX_AIR_DISTANCE, 
            "TIMES_SACKED": s.TIMES_SACKED,
            "TIMES_BLITZED": s.TIMES_BLITZED,
            "TIMES_HURRIED": s.TIMES_HURRIED,
            "TIMES_HIT": s.TIMES_HIT,
            "TIMES_PRESSURED": s.TIMES_PRESSURED,
            "TIMES_PRESSURED_PCT": s.TIMES_PRESSURED_PCT
        }
        data.append(game_data)
    
    return jsonify(data)



@nfl_stats_bp.route('/receiving/stats/<player_id>', methods=['GET'])
def get_receiving_stats_for_player(player_id):
    # Fetch all receiving stats for the player
    stats = NFLReceivingWeeklyStats.query.filter_by(PLAYER_ID=player_id).all()
    
    data = []
    for s in stats:
        game_data = {
            # Core player/game info
            "PLAYER_NAME": s.PLAYER_NAME,
            "PLAYER_ABBR": s.PLAYER_ABBR,
            "GAME_ID": s.GAME_ID,
            "WEEK": s.WEEK,
            "RECENT_TEAM": s.RECENT_TEAM,
            "OPPONENT_TEAM": s.OPPONENT_TEAM,
            "SEASON": s.SEASON,
            "SEASON_TYPE": s.SEASON_TYPE,
            "POSITION": s.POSITION,
            "HEADSHOT_URL": s.HEADSHOT_URL,

            # Receiving stats
            "RECEPTIONS": s.RECEPTIONS,
            "TARGETS": s.TARGETS,
            "RECEIVING_YARDS": s.RECEIVING_YARDS,
            "RECEIVING_TDS": s.RECEIVING_TDS,
            "RECEIVING_FUMBLES": s.RECEIVING_FUMBLES,
            "RECEIVING_FUMBLES_LOST": s.RECEIVING_FUMBLES_LOST,
            "RECEIVING_AIR_YARDS": s.RECEIVING_AIR_YARDS,
            "RECEIVING_YARDS_AFTER_CATCH": s.RECEIVING_YARDS_AFTER_CATCH,
            "RECEIVING_FIRST_DOWNS": s.RECEIVING_FIRST_DOWNS,
            "RECEIVING_EPA": s.RECEIVING_EPA,
            "RECEIVING_2PT_CONVERSIONS": s.RECEIVING_2PT_CONVERSIONS,

            # Advanced Receiving Metrics
            "RACR": s.RACR,
            "TARGET_SHARE": s.TARGET_SHARE,
            "AIR_YARDS_SHARE": s.AIR_YARDS_SHARE,
            "WOPR": s.WOPR,

            # Special Teams & Fantasy
            "SPECIAL_TEAMS_TDS": s.SPECIAL_TEAMS_TDS,
            "FANTASY_POINTS": s.FANTASY_POINTS,
            "FANTASY_POINTS_PPR": s.FANTASY_POINTS_PPR,

            # Extra Advanced Receiving Metrics
            "RECEIVING_BROKEN_TACKLES": s.RECEIVING_BROKEN_TACKLES,
            "RECEIVING_DROP": s.RECEIVING_DROP,
            "RECEIVING_DROP_PCT": s.RECEIVING_DROP_PCT,
            "RECEIVING_INT": s.RECEIVING_INT,
            "RECEIVING_RAT": s.RECEIVING_RAT,

            # Tracking Metrics
            "AVG_CUSHION": s.AVG_CUSHION,
            "AVG_SEPARATION": s.AVG_SEPARATION,
            "AVG_INTENDED_AIR_YARDS": s.AVG_INTENDED_AIR_YARDS,
            "PERCENT_SHARE_OF_INTENDED_AIR_YARDS": s.PERCENT_SHARE_OF_INTENDED_AIR_YARDS,
            "AVG_YAC": s.AVG_YAC,
            "AVG_EXPECTED_YAC": s.AVG_EXPECTED_YAC,
            "AVG_YAC_ABOVE_EXPECTATION": s.AVG_YAC_ABOVE_EXPECTATION,
        }
        data.append(game_data)
    
    return jsonify(data)
