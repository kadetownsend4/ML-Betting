"""File that holds all routes for accessing NFL data

   authors = Timothy Berlanga
"""

# I asked chatgpt for help creating routes for our data based on the nfl models and how to set up a file for it 
# https://chatgpt.com/share/68000cf1-1714-800f-a0b5-4afc3d924474 

from flask import Blueprint, jsonify, request
from .extensions import db
from .models import NFLQuarterbackWeeklyStats, NFLReceivingWeeklyStats, NFLRBWeeklyStats, NFLTeam, NFLPlayer, NFLGames, NFLTeamGameStats

nfl_stats_bp = Blueprint('nfl_stats', __name__)


# --- TEAM ROUTES ---
@nfl_stats_bp.route('/nfl_teams', methods=['GET'])
def fetch_teams():
    """Function to fetch all teams from the NFLTeam table with only the required columns

       Return:
       JSONified data of all nfl teams
    """
    
    # Changes to commit
    teams = NFLTeam.query.with_entities(
        NFLTeam.TEAM_ID,
        NFLTeam.TEAM_NAME,
        NFLTeam.TEAM_ABR,
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
            "TEAM_ABR": team.TEAM_ABR
        }
        for team in teams
    ]

    return jsonify(team_data)

@nfl_stats_bp.route('/nfl_teams/<string:team_abr>/players', methods=['GET'])
def get_players_for_team(team_abr):
    """Function to fetch all players for a specific nfl team

       Parameters:
       team_abr -- team to search players for

       Return:
       JSONified data of all nfl players on a team
    """

    team = NFLTeam.query.filter_by(TEAM_ABR=team_abr.upper()).first()
    if not team:
        return jsonify({'error': 'Team not found'}), 404

    players = NFLPlayer.query.filter_by(TEAM_ID=team.TEAM_ID).all()

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

def _get_result(game, is_home):
    """Function to get results of games

       Parameters:
       game -- game to search for
       is_home -- boolean telling if current team being searched is home

       Return:
       String showcasing if a team won, loss, tied, or hasnt played yet
    """
    if game.HOME_SCORE is None or game.AWAY_SCORE is None:
        return "Scheduled"
    
    team_score = game.HOME_SCORE if is_home else game.AWAY_SCORE
    opponent_score = game.AWAY_SCORE if is_home else game.HOME_SCORE

    if team_score > opponent_score:
        return "W"
    elif team_score < opponent_score:
        return "L"
    else:
        return "T"

@nfl_stats_bp.route('/nfl_teams/<string:team_abbr>/schedule', methods=['GET'])
def get_team_schedule(team_abbr):
    """Function to fetch team schedule for a specific team

       Parameters:
       team_abr -- team to search schedule for

       Return:
       JSONified data of schedule for a team
    """
    team = NFLTeam.query.filter_by(TEAM_ABR=team_abbr.upper()).first()
    if not team:
        return jsonify({'error': 'Team not found'}), 404

    games = NFLGames.query.filter(
        (NFLGames.HOME_TEAM == team_abbr.upper()) | 
        (NFLGames.AWAY_TEAM == team_abbr.upper())
    ).order_by(NFLGames.WEEK).all()

    schedule = []
    for game in games:
        is_home = game.HOME_TEAM == team_abbr.upper()
        opponent = game.away_team_ref if is_home else game.home_team_ref
        opponent_abbr = game.AWAY_TEAM if is_home else game.HOME_TEAM

        schedule.append({
            'GAME_ID': game.GAME_ID,
            'WEEK': game.WEEK,
            'IS_HOME': is_home,
            'OPPONENT_ABR': opponent_abbr,
            'OPPONENT_NAME': opponent.TEAM_NAME if opponent else None,
            'OPPONENT_LOGO': opponent.TEAM_LOGO if opponent else None,
            'TEAM_SCORE': game.HOME_SCORE if is_home else game.AWAY_SCORE,
            'OPPONENT_SCORE': game.AWAY_SCORE if is_home else game.HOME_SCORE,
            'RESULT': _get_result(game, is_home)
        })

    return jsonify({
        'TEAM_ABR': team.TEAM_ABR,
        'TEAM_NAME': team.TEAM_NAME,
        'TEAM_LOGO': team.TEAM_LOGO,
        'schedule': schedule
    })


# https://chatgpt.com/share/6807185c-99d0-800f-a459-45b68633d38e
@nfl_stats_bp.route('/nfl_teams/<string:team_abr>/game_stats', methods=['GET'])
def get_team_game_stats(team_abr):
    """Function to fetch all game stats for a specific team

       Parameters:
       team_abr -- team to search game stats for

       Return:
       JSONified data of all game stats on a team
    """

    # Check if team exists
    team = NFLTeam.query.filter_by(TEAM_ABR=team_abr.upper()).first()
    if not team:
        return jsonify({'error': 'Team not found'}), 404

    # Fetch all game stats for this team
    stats = NFLTeamGameStats.query \
        .filter_by(TEAM=team_abr.upper()) \
        .join(NFLGames, NFLTeamGameStats.GAME_ID == NFLGames.GAME_ID) \
        .add_entity(NFLGames) \
        .all()

    results = []
    for stat, game in stats:
        results.append({
            'GAME_ID': stat.GAME_ID,
            'WEEK': stat.WEEK,
            'TEAM': stat.TEAM,
            'OPPONENT': game.AWAY_TEAM if stat.TEAM == game.HOME_TEAM else game.HOME_TEAM,
            'IS_HOME': stat.TEAM == game.HOME_TEAM,
            'SCORE_FOR': game.HOME_SCORE if stat.TEAM == game.HOME_TEAM else game.AWAY_SCORE,
            'SCORE_AGAINST': game.AWAY_SCORE if stat.TEAM == game.HOME_TEAM else game.HOME_SCORE,
            'TOTAL_YARDS': stat.TOTAL_YARDS,
            'TOTAL_TDS': stat.TOTAL_TDS,
            'PASSING_TDS': stat.PASSING_TDS,
            'RUSHING_TDS': stat.RUSHING_TDS,
            'NUM_PLAYS': stat.NUM_PLAYS,
            'AVG_EPA': stat.AVG_EPA,
            'SUCCESS_RATE': stat.SUCCESS_RATE,
            'TOTAL_RUSH_YARDS': stat.TOTAL_RUSH_YARDS,
            'TOTAL_PASS_YARDS': stat.TOTAL_PASS_YARDS,
            'PASS_ATTEMPTS': stat.PASS_ATTEMPTS,
            'RUSH_ATTEMPTS': stat.RUSH_ATTEMPTS,
            'COMPLETE_PASSES': stat.COMPLETE_PASSES,
            'INCOMPLETE_PASSES': stat.INCOMPLETE_PASSES,
            'SACKS': stat.SACKS,
            'TOTAL_PENALTY_YARDS': stat.TOTAL_PENALTY_YARDS,
            'FUMBLES_LOST': stat.FUMBLES_LOST,
            'INTERCEPTIONS': stat.INTERCEPTIONS,
            'THIRD_DOWN_CONVERTED': stat.THIRD_DOWN_CONVERTED,
            'FOURTH_DOWN_CONVERTED': stat.FOURTH_DOWN_CONVERTED,
            'WP': stat.WP,
            'HOME_WP': stat.HOME_WP,
            'AWAY_WP': stat.AWAY_WP
        })

    return jsonify({
        'team': {
            'TEAM_ID': team.TEAM_ID,
            'TEAM_NAME': team.TEAM_NAME,
            'TEAM_ABR': team.TEAM_ABR,
            'TEAM_LOGO': team.TEAM_LOGO,
            'TEAM_WORDMARK': team.TEAM_WORDMARK
        },
        'game_stats': results
    })

@nfl_stats_bp.route('/nfl_teams/<string:team_abr>/season_avg', methods=['GET'])
def get_team_season_averages(team_abr):
    """Function to fetch season stats averages for a specific team

       Parameters:
       team_abr -- team to search averages for

       Return:
       JSONified data of all averaged season stats on a team
    """
    # Check if team exists
    team = NFLTeam.query.filter_by(TEAM_ABR=team_abr.upper()).first()
    if not team:
        return jsonify({'error': 'Team not found'}), 404

    # Get all game stats for that team
    stats = NFLTeamGameStats.query.filter_by(TEAM=team_abr.upper()).all()
    if not stats:
        return jsonify({'error': 'No game stats found for team'}), 404

    # Calculate average for each stat
    total_games = len(stats)

    def avg(attr):
        return round(sum(getattr(s, attr) or 0 for s in stats) / total_games, 2)

    season_avg = {
        'TEAM': team.TEAM_ABR,
        'TOTAL_GAMES': total_games,
        'AVG_TOTAL_YARDS': avg('TOTAL_YARDS'),
        'AVG_TOTAL_TDS': avg('TOTAL_TDS'),
        'AVG_PASSING_TDS': avg('PASSING_TDS'),
        'AVG_RUSHING_TDS': avg('RUSHING_TDS'),
        'AVG_NUM_PLAYS': avg('NUM_PLAYS'),
        'AVG_EPA': avg('AVG_EPA'),
        'AVG_SUCCESS_RATE': avg('SUCCESS_RATE'),
        'AVG_TOTAL_RUSH_YARDS': avg('TOTAL_RUSH_YARDS'),
        'AVG_TOTAL_PASS_YARDS': avg('TOTAL_PASS_YARDS'),
        'AVG_PASS_ATTEMPTS': avg('PASS_ATTEMPTS'),
        'AVG_RUSH_ATTEMPTS': avg('RUSH_ATTEMPTS'),
        'AVG_COMPLETE_PASSES': avg('COMPLETE_PASSES'),
        'AVG_INCOMPLETE_PASSES': avg('INCOMPLETE_PASSES'),
        'AVG_SACKS': avg('SACKS'),
        'AVG_TOTAL_PENALTY_YARDS': avg('TOTAL_PENALTY_YARDS'),
        'AVG_FUMBLES_LOST': avg('FUMBLES_LOST'),
        'AVG_INTERCEPTIONS': avg('INTERCEPTIONS'),
        'AVG_THIRD_DOWN_CONVERTED': avg('THIRD_DOWN_CONVERTED'),
        'AVG_FOURTH_DOWN_CONVERTED': avg('FOURTH_DOWN_CONVERTED'),
        'AVG_WP': avg('WP'),
        'AVG_HOME_WP': avg('HOME_WP'),
        'AVG_AWAY_WP': avg('AWAY_WP')
    }

    return jsonify({
        'team': {
            'TEAM_ID': team.TEAM_ID,
            'TEAM_NAME': team.TEAM_NAME,
            'TEAM_ABR': team.TEAM_ABR,
            'TEAM_LOGO': team.TEAM_LOGO,
            'TEAM_WORDMARK': team.TEAM_WORDMARK
        },
        'season_averages': season_avg
    })


@nfl_stats_bp.route('/nfl_games/<string:game_id>/team_stats', methods=['GET'])
def get_game_team_stats(game_id):
    """Function to fetch game stats for both teams for a game

       Parameters:
       game_id -- game to pull stats for

       Return:
       JSONified data of all stats for a game
    """
    # Get the game info
    game = NFLGames.query.filter_by(GAME_ID=game_id).first()
    if not game:
        return jsonify({'error': 'Game not found'}), 404

    # Get the team stats for both teams in this game
    team_stats = NFLTeamGameStats.query \
        .filter(NFLTeamGameStats.GAME_ID == game_id) \
        .all()

    if not team_stats or len(team_stats) != 2:
        return jsonify({'error': 'Game stats not available for both teams'}), 404

    results = []

    for stat in team_stats:
        team = NFLTeam.query.filter_by(TEAM_ABR=stat.TEAM).first()
        if not team:
            continue

        results.append({
            'TEAM': {
                'TEAM_ID': team.TEAM_ID,
                'TEAM_NAME': team.TEAM_NAME,
                'TEAM_ABR': team.TEAM_ABR,
                'TEAM_LOGO': team.TEAM_LOGO,
                'TEAM_WORDMARK': team.TEAM_WORDMARK
            },
            'IS_HOME': stat.TEAM == game.HOME_TEAM,
            'SCORE': game.HOME_SCORE if stat.TEAM == game.HOME_TEAM else game.AWAY_SCORE,
            'OPPONENT_SCORE': game.AWAY_SCORE if stat.TEAM == game.HOME_TEAM else game.HOME_SCORE,
            'TOTAL_YARDS': stat.TOTAL_YARDS,
            'TOTAL_TDS': stat.TOTAL_TDS,
            'PASSING_TDS': stat.PASSING_TDS,
            'RUSHING_TDS': stat.RUSHING_TDS,
            'NUM_PLAYS': stat.NUM_PLAYS,
            'AVG_EPA': stat.AVG_EPA,
            'SUCCESS_RATE': stat.SUCCESS_RATE,
            'TOTAL_RUSH_YARDS': stat.TOTAL_RUSH_YARDS,
            'TOTAL_PASS_YARDS': stat.TOTAL_PASS_YARDS,
            'PASS_ATTEMPTS': stat.PASS_ATTEMPTS,
            'RUSH_ATTEMPTS': stat.RUSH_ATTEMPTS,
            'COMPLETE_PASSES': stat.COMPLETE_PASSES,
            'INCOMPLETE_PASSES': stat.INCOMPLETE_PASSES,
            'SACKS': stat.SACKS,
            'TOTAL_PENALTY_YARDS': stat.TOTAL_PENALTY_YARDS,
            'FUMBLES_LOST': stat.FUMBLES_LOST,
            'INTERCEPTIONS': stat.INTERCEPTIONS,
            'THIRD_DOWN_CONVERTED': stat.THIRD_DOWN_CONVERTED,
            'FOURTH_DOWN_CONVERTED': stat.FOURTH_DOWN_CONVERTED,
            'WP': stat.WP,
            'HOME_WP': stat.HOME_WP,
            'AWAY_WP': stat.AWAY_WP
        })

    return jsonify({
        'GAME_ID': game.GAME_ID,
        'WEEK': game.WEEK,
        'AWAY_TEAM': game.AWAY_TEAM,
        'HOME_TEAM': game.HOME_TEAM,
        'AWAY_SCORE': game.AWAY_SCORE,
        'HOME_SCORE': game.HOME_SCORE,
        'team_stats': results
    })

@nfl_stats_bp.route('/nfl_games', methods=['GET'])
def get_all_games():
    week = request.args.get('week', type=int)  # optional query param ?week=1

    query = NFLGames.query

    if week:
        query = query.filter_by(WEEK=week)

    games = query.all()

    game_data = [
        {
            'GAME_ID': game.GAME_ID,
            'WEEK': game.WEEK,
            'HOME_TEAM': game.HOME_TEAM,
            'AWAY_TEAM': game.AWAY_TEAM,
            'HOME_SCORE': game.HOME_SCORE,
            'AWAY_SCORE': game.AWAY_SCORE,
            'HOME_TEAM_NAME': game.home_team_ref.TEAM_NAME if game.home_team_ref else None,
            'AWAY_TEAM_NAME': game.away_team_ref.TEAM_NAME if game.away_team_ref else None,
            'HOME_TEAM_LOGO': game.home_team_ref.TEAM_LOGO if game.home_team_ref else None,
            'AWAY_TEAM_LOGO': game.away_team_ref.TEAM_LOGO if game.away_team_ref else None,
        }
        for game in games
    ]

    return jsonify(game_data)




# --- WEEKLY PLAYER POSITION ROUTES ---
@nfl_stats_bp.route('/qb/stats/<player_id>', methods=['GET'])
def get_full_qb_stats(player_id):
    """Function to fetch full qb stats for a player

       Parameters:
       player_id -- player to search for

       Return:
       JSONified data of qb stats for a player
    """

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

@nfl_stats_bp.route('/qb/stats/game/<game_id>', methods=['GET'])
def get_qbs_by_game(game_id):
    """Function to fetch qbs and qb stats game

       Parameters:
       game_id -- game to search by

       Return:
       JSONified data of all qbs and their stats for a specific game
    """
    stats = NFLQuarterbackWeeklyStats.query.filter_by(GAME_ID=game_id).all()

    if not stats:
        return jsonify({"message": "No QB stats found for this game"}), 404

    results = []
    for s in stats:
        results.append({
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
        })

    return jsonify(results)



@nfl_stats_bp.route('/receiving/stats/<player_id>', methods=['GET'])
def get_receiving_stats_for_player(player_id):
    """Function to fetch all stats for a receiver

       Parameters:
       player_id -- player to pull stats for

       Return:
       JSONified data of all stats for a receiver
    """

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


@nfl_stats_bp.route('/rec/stats/game/<game_id>', methods=['GET'])
def get_receivers_by_game(game_id):
    """Function to fetch all recievers and stats for a specific game

       Parameters:
       game_id -- game to pull receivers for

       Return:
       JSONified data of all receivers and stats for a game
    """
    stats = NFLReceivingWeeklyStats.query.filter_by(GAME_ID=game_id).all()

    if not stats:
        return jsonify({"message": "No receiving stats found for this game"}), 404

    results = []
    for s in stats:
        results.append({
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
        })

    return jsonify(results)






# --- MERGED RB STATS ROUTE ---
@nfl_stats_bp.route('/rb/stats/<player_id>', methods=['GET'])
def get_full_rb_stats(player_id):
    """Function to fetch all stats for a specific running back

       Parameters:
       player_id -- player to return stats for

       Return:
       JSONified data of all stats for a specific running back
    """

    stats = NFLRBWeeklyStats.query.filter_by(PLAYER_ID=player_id).all()
    
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

            # Rushing stats
            "CARRIES": s.CARRIES,
            "RUSHING_YARDS": s.RUSHING_YARDS,
            "RUSHING_TDS": s.RUSHING_TDS,
            "RUSHING_FUMBLES": s.RUSHING_FUMBLES,
            "RUSHING_FUMBLES_LOST": s.RUSHING_FUMBLES_LOST,
            "RUSHING_FIRST_DOWNS": s.RUSHING_FIRST_DOWNS,
            "RUSHING_EPA": s.RUSHING_EPA,
            "RUSHING_2PT_CONVERSIONS": s.RUSHING_2PT_CONVERSIONS,

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

            # Fantasy
            "FANTASY_POINTS": s.FANTASY_POINTS,
            "FANTASY_POINTS_PPR": s.FANTASY_POINTS_PPR,

            # Advanced Rushing Metrics
            "RUSHING_YARDS_BEFORE_CONTACT": s.RUSHING_YARDS_BEFORE_CONTACT,
            "RUSHING_YARDS_BEFORE_CONTACT_AVG": s.RUSHING_YARDS_BEFORE_CONTACT_AVG,
            "RUSHING_YARDS_AFTER_CONTACT": s.RUSHING_YARDS_AFTER_CONTACT,
            "RUSHING_YARDS_AFTER_CONTACT_AVG": s.RUSHING_YARDS_AFTER_CONTACT_AVG,
            "RUSHING_BROKEN_TACKLES": s.RUSHING_BROKEN_TACKLES,
            "EFFICIENCY": s.EFFICIENCY,
            "PERCENT_ATTEMPTS_GTE_EIGHT_DEFENDERS": s.PERCENT_ATTEMPTS_GTE_EIGHT_DEFENDERS,
            "AVG_TIME_TO_LOS": s.AVG_TIME_TO_LOS,
            "EXPECTED_RUSH_YARDS": s.EXPECTED_RUSH_YARDS,
            "RUSH_YARDS_OVER_EXPECTED": s.RUSH_YARDS_OVER_EXPECTED,
            "RUSH_YARDS_OVER_EXPECTED_PER_ATT": s.RUSH_YARDS_OVER_EXPECTED_PER_ATT,
            "RUSH_PCT_OVER_EXPECTED": s.RUSH_PCT_OVER_EXPECTED
        }
        data.append(game_data)

    return jsonify(data)

@nfl_stats_bp.route('/rb/stats/game/<game_id>', methods=['GET'])
def get_rbs_by_game(game_id):
    """Function to fetch all rbs and their stats for a specific game

       Parameters:
       game_id -- game to pull stats for

       Return:
       JSONified data of all stats for rbs in a game
    """

    stats = NFLRBWeeklyStats.query.filter_by(GAME_ID=game_id).all()

    if not stats:
        return jsonify({"message": "No RB stats found for this game"}), 404

    results = []
    for s in stats:
        results.append({
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

            # Rushing stats
            "CARRIES": s.CARRIES,
            "RUSHING_YARDS": s.RUSHING_YARDS,
            "RUSHING_TDS": s.RUSHING_TDS,
            "RUSHING_FUMBLES": s.RUSHING_FUMBLES,
            "RUSHING_FUMBLES_LOST": s.RUSHING_FUMBLES_LOST,
            "RUSHING_FIRST_DOWNS": s.RUSHING_FIRST_DOWNS,
            "RUSHING_EPA": s.RUSHING_EPA,
            "RUSHING_2PT_CONVERSIONS": s.RUSHING_2PT_CONVERSIONS,

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

            # Fantasy
            "FANTASY_POINTS": s.FANTASY_POINTS,
            "FANTASY_POINTS_PPR": s.FANTASY_POINTS_PPR,

            # Advanced Rushing Metrics
            "RUSHING_YARDS_BEFORE_CONTACT": s.RUSHING_YARDS_BEFORE_CONTACT,
            "RUSHING_YARDS_BEFORE_CONTACT_AVG": s.RUSHING_YARDS_BEFORE_CONTACT_AVG,
            "RUSHING_YARDS_AFTER_CONTACT": s.RUSHING_YARDS_AFTER_CONTACT,
            "RUSHING_YARDS_AFTER_CONTACT_AVG": s.RUSHING_YARDS_AFTER_CONTACT_AVG,
            "RUSHING_BROKEN_TACKLES": s.RUSHING_BROKEN_TACKLES,
            "EFFICIENCY": s.EFFICIENCY,
            "PERCENT_ATTEMPTS_GTE_EIGHT_DEFENDERS": s.PERCENT_ATTEMPTS_GTE_EIGHT_DEFENDERS,
            "AVG_TIME_TO_LOS": s.AVG_TIME_TO_LOS,
            "EXPECTED_RUSH_YARDS": s.EXPECTED_RUSH_YARDS,
            "RUSH_YARDS_OVER_EXPECTED": s.RUSH_YARDS_OVER_EXPECTED,
            "RUSH_YARDS_OVER_EXPECTED_PER_ATT": s.RUSH_YARDS_OVER_EXPECTED_PER_ATT,
            "RUSH_PCT_OVER_EXPECTED": s.RUSH_PCT_OVER_EXPECTED
        })

    return jsonify(results)