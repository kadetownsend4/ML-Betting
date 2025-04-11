from flask import Blueprint, render_template, jsonify, request, redirect, url_for, flash
from .models import User, NFLTeam, NFLQuarterbackWeeklyStats, NBATeam, NBAGameIds, NBAGameLogs, NBAPredictions
from .extensions import db 
from sqlalchemy.orm import aliased

main = Blueprint('main', __name__)

@main.route('/')
def index():
    users = User.query.all()
    users_list_html = [f"<li>{user.username}</li>" for user in users]
    return f"<ul>{''.join(users_list_html)}</ul>"

# @main.route('/')
# def index():
#     return render_template('index.html')


@main.route('/NBATeams')
def fetch_nba_teams():
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


@main.route('/NBAMatchups/<team>')
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


@main.route('/NBAMatchups/<awayteam>/<hometeam>/<gameid>')
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


@main.route('/NBAPredictions/date/<date>/<feature>/<model>')
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


@main.route('/NBAPredictions/team/<team>/<feature>/<model>')
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

# I referenced chatgpt for help creating methods for adding users, login, and fetching data.
# https://chatgpt.com/share/67e49261-fcfc-800f-a302-03d2a6125d48
@main.route('/add', methods=['GET', 'POST'])
def add_user():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        # Create new user with the provided info
        new_user = User(username=username, email=email)
        new_user.set_password(password)  # Hash the password
        db.session.add(new_user)
        db.session.commit()
        
        return redirect(url_for('main.index'))

    return render_template('register.html')

@main.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Retrieve form data
        username = request.form['username']
        password = request.form['password']
        
        # Find the user by username
        user = User.query.filter_by(username=username).first()
        
        if user and user.check_password(password):  # Check if the password matches
            # User is authenticated, redirect to a protected page
            flash("Login successful!", category="success")
            return redirect(url_for('main.index'))  # Or any other page you want to redirect to
        else:
            flash("Invalid username or password", category="error")
    
    # If GET request, just render the login page
    return render_template('login.html')

@main.route('/fetch_teams', methods=['GET'])
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

