"""
    File that holds all the routes for acessing data from the database (NBA, USER). 

   authors = Timothy Berlanga, Kade Townsend
"""

from flask import Blueprint, render_template, jsonify, request, redirect, url_for, flash, Flask, session

# Must import the database models to be able to access them in the queries 
from .models import User, NFLTeam, NFLQuarterbackWeeklyStats, NBATeam, NBAGameIds, NBAGameLogs, NBAPredictions, NBATeamStats
from .extensions import db
from sqlalchemy.orm import aliased


main = Blueprint('main', __name__)


@main.route('/')
def index():
    """
       Function as a home page route.
       
       This is the route which I intially used to get an understanding of flask and the database. It is strictly a backend
       route for testing at the moment, it is not utilized by our frontend.

       This was the conversation in which I made initial model for the user and created a route to easily see the user's
       registered in the db. 

       Chat Link: https://chatgpt.com/share/67e49261-fcfc-800f-a302-03d2a6125d48 
       
       Return:
       List of users in the database
    """
    users = User.query.all()
    users_list_html = [f"<li>{user.username}</li>" for user in users]
    return f"<ul>{''.join(users_list_html)}</ul>"


@main.route('/NBATeams')
def fetch_nba_teams():
    """
       Function for fetching all the information for each NBA team from the database.
       It then turns this data into JSON format for use by the frontend.

       Return:
       List of NBA team information in JSON format
    """
    # calls the nbateams table from the db
    teams = db.session.query(NBATeam).all()

    # turns the table into JSON
    team_data = [
        {
            "TEAM_ID": team.TEAM_ID,
            "TEAM_NAME": team.TEAM_NAME,
            "TEAM_ABR": team.TEAM_ABR,
            "TEAM_NICKNAME": team.TEAM_NICKNAME,
            "TEAM_CITY": team.TEAM_CITY,
            "TEAM_STATE": team.TEAM_STATE,
            "TEAM_YEAR_FOUNDED": team.TEAM_YEAR_FOUNDED,
            "TEAM_LOGO": team.TEAM_LOGO
        }
        for team in teams
        # loops through teams
    ]
    return jsonify(team_data)

@main.route('/NBAStats/<string:season>')
def fetch_nba_team_stats(season):
    """
       Function for fetching all team stats information from the database, 
       optionally filtered by season, along with the team logos.
       It turns this data into JSON format for use by the frontend.

       Return:
       List of NBA team stats information in JSON format, optionally filtered by season.

       Chat Link: https://chatgpt.com/share/6807185c-99d0-800f-a459-45b68633d38e
    """
    # Fetch all team stats for the given season
    team_stats = db.session.query(NBATeamStats).filter(NBATeamStats.SEASON == season).all()

    # Create a dictionary for team logos for quick lookup
    team_logos = {team.TEAM_ID: team.TEAM_LOGO for team in db.session.query(NBATeam).all()}

    # Convert the data into a list of dictionaries, including logos
    team_stats_data = [
        {
            "TEAM_ID": stat.TEAM_ID,
            "TEAM": stat.TEAM,
            "SEASON": stat.SEASON,
            "GP": stat.GP,
            "W": stat.W,
            "L": stat.L,
            "WIN_PCT": stat.WIN_PCT,
            "MIN": stat.Min,
            "PTS": stat.PTS,
            "FGM": stat.FGM,
            "FGA": stat.FGA,
            "FG_PCT": stat.FG_PCT,
            "THREE_PM": stat.THREE_PM,
            "THREE_PA": stat.THREE_PA,
            "THREE_PCT": stat.THREE_PCT,
            "FTM": stat.FTM,
            "FTA": stat.FTA,
            "FT_PCT": stat.FT_PCT,
            "OREB": stat.OREB,
            "DREB": stat.DREB,
            "REB": stat.REB,
            "AST": stat.AST,
            "TOV": stat.TOV,
            "STL": stat.STL,
            "BLK": stat.BLK,
            "BLKA": stat.BLKA,
            "PF": stat.PF,
            "PFD": stat.PFD,
            "PLUS_MINUS": stat.PLUS_MINUS,
            "TEAM_LOGO": team_logos.get(stat.TEAM_ID, None)  # Add the team logo to the stats
        }
        for stat in team_stats
    ]
    
    return jsonify(team_stats_data)


@main.route('/NBAMatchups/<team>')
def fetch_matchups(team):
    """
       Function to fetch matchups for each NBA team from the database.

       Parameters:
       team -- team to pull matchups for

       Return:
       List of matchups for a specific NBA team in JSON format

       Chat Link: https://chatgpt.com/share/67f1def5-5fec-8011-a277-13d1807abb6a
    """

    # normalizes teams with spaces in their nicknames, so they can be parameterized correctly
    team_norm = team.replace('-', ' ')

    # calls an alias of the nbateams table as the home team
    HomeTeam = aliased(NBATeam)
    # calls an alias of the nbateams table as the away team
    AwayTeam = aliased(NBATeam)

    # queries nbagamelogs, nbagameids, and nbateams table,
    # joining the GAME_ID of nbagamelogs and nbagameids for the getting TEAM_IDs,
    # joining the TEAM_IDs of nbagameids and nbateams for getting TEAM_NAMEs,
    # ordering the games in descending order by GAME_DATE
    matchups = db.session.query(
        NBAGameLogs,
        NBAGameIds,
        HomeTeam.TEAM_NAME.label("HOME_TEAM_NAME"),
        AwayTeam.TEAM_NAME.label("AWAY_TEAM_NAME"),
        HomeTeam.TEAM_LOGO.label("HOME_LOGO"),
        AwayTeam.TEAM_LOGO.label("AWAY_LOGO")
    ).join(
        NBAGameIds, NBAGameLogs.GAME_ID == NBAGameIds.GAME_ID
    ).join(
        HomeTeam, NBAGameIds.HOME_TEAM_ID == HomeTeam.TEAM_ID
    ).join(
        AwayTeam, NBAGameIds.AWAY_TEAM_ID == AwayTeam.TEAM_ID
    ).filter(
        NBAGameLogs.NICKNAME == team_norm
    ).order_by(NBAGameLogs.GAME_DATE.desc()).all()

    # takes the queried data and turns it into JSON format
    matchup_data = [
        {
            "CITY": log.CITY,
            "GAME_ID": log.GAME_ID,
            # "AWAY_ID": game.AWAY_TEAM_ID,
            # "HOME_ID": game.HOME_TEAM_ID,
            "DATE": game.GAME_DATE,
            "AWAY_TEAM": AWAY_NAME,
            "HOME_TEAM": HOME_NAME,
            "AWAY_LOGO": AWAY_LOGO,
            "HOME_LOGO": HOME_LOGO
        }
        for log, game, HOME_NAME, AWAY_NAME, HOME_LOGO, AWAY_LOGO in matchups
        # loops through sections in matchups
    ]
    return jsonify(matchup_data)

@main.route('/NBAMatchups/<awayteam>/<hometeam>/<gameid>')
def fetch_matchup_stats(awayteam, hometeam, gameid):
    """
       Function for featching stats for specific nba matchups.

       Parameters:
       awayteam -- away team nickname in the specific matchup
       hometeam -- home team nickname in the specific matchup
       gameid -- specific game id of matchup

       Return:
       Matchup stats for each team in JSON format

       Chat Link: https://chatgpt.com/share/67f32d2e-a9ec-8011-9514-5bafa1f0b555
    """
    # normalizes teams with spaces in their nicknames, so they can be parameterized correctly
    away_team_norm = awayteam.replace('-', ' ')
    home_team_norm = hometeam.replace('-', ' ')

    # calls an alias of the nbagamelogs table as the home team
    Home = aliased(NBAGameLogs)
    # calls an alias of the nbagamelogs table as the away team
    Away = aliased(NBAGameLogs)

    # queries the stats from the db based on aliases of nbagamelogs table,
    # joining GAME_ID of the aliased tables to get stats,
    # filtering for only one copy of the stats from each alias,
    # and by GAME_ID,
    # getting the first result for security purposes
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

    # turn queried data into JSON
    stats_data = {
        'GAME_ID': stats.GAME_ID,
        'GAME_DATE': stats.GAME_DATE,
        'HOME_NAME': home_team_norm,
        'HOME_W': stats.HOME_W,
        'HOME_FG_PCT': stats.HOME_FG_PCT,
        'HOME_FG3_PCT': stats.HOME_FG3_PCT,
        'HOME_FT_PCT': stats.HOME_FT_PCT,
        'HOME_TOT_REB': stats.HOME_TOT_REB,
        'HOME_AST': stats.HOME_AST,
        'HOME_PF': stats.HOME_PF,
        'HOME_STL': stats.HOME_STL,
        'HOME_TOTAL_TURNOVERS': stats.HOME_TOTAL_TURNOVERS,
        'HOME_BLK': stats.HOME_BLK,
        'HOME_PTS': stats.HOME_PTS,
        'AWAY_NAME': away_team_norm,
        'AWAY_W': stats.AWAY_W,
        'AWAY_FG_PCT': stats.AWAY_FG_PCT,
        'AWAY_FG3_PCT': stats.AWAY_FG3_PCT,
        'AWAY_FT_PCT': stats.AWAY_FT_PCT,
        'AWAY_TOT_REB': stats.AWAY_TOT_REB,
        'AWAY_AST': stats.AWAY_AST,
        'AWAY_PF': stats.AWAY_PF,
        'AWAY_STL': stats.AWAY_STL,
        'AWAY_TOTAL_TURNOVERS': stats.AWAY_TOTAL_TURNOVERS,
        'AWAY_BLK': stats.AWAY_BLK,
        'AWAY_PTS': stats.AWAY_PTS
    }
    return jsonify(stats_data)

# for getattr()
@main.route('/NBAPredictions/date/<date>/<feature>/<model>')
def fetch_predictions_by_date(date, feature, model):
    """
       Function for getting JSON-formatted predictions for a
       specific date of game and a specific set of features and
       ML model

       Parameters:
       date -- specific date to pull game predictions for
       feature -- specific feature set to get predictions for
       model -- specific model name to get predictions for

       Return:
       List of predictions in JSON format

       Chat Link: https://chatgpt.com/share/67f71594-5774-8011-90fc-d177cb2c83e0
    """

    # calls an alias of the nbateams table as the home team
    HomeTeam = aliased(NBATeam)
    # calls an alias of the nbateams table as the away team
    AwayTeam = aliased(NBATeam)

    # combines names for feature and model
    name_h = feature + "_" + model + "_HOME_W_PROB"
    name_a = feature + "_" + model + "_AWAY_W_PROB"

    # calls the specific column from nbapredictions table in database
    # based on combined name
    home_probs = getattr(NBAPredictions, name_h)
    away_probs = getattr(NBAPredictions, name_a)

    # queries nbapredictions, nbagameids, and nbateams,
    # joining GAME_ID of nbapredictions and nbagameids for TEAM_IDs,
    # joining TEAM_ID of nbagameids and aliased nbateams for TEAM_NAMEs,
    # filtering by a specific GAME_DATE, and grabbing all results
    predictions = db.session.query(
        NBAPredictions.GAME_ID,
        home_probs.label("home_probs"),
        away_probs.label("away_probs"),
        NBAGameIds,
        HomeTeam.TEAM_NAME.label("HOME_TEAM_NAME"),
        AwayTeam.TEAM_NAME.label("AWAY_TEAM_NAME"),
        HomeTeam.TEAM_LOGO.label("HOME_LOGO"),
        AwayTeam.TEAM_LOGO.label("AWAY_LOGO")
    ).join(
        NBAGameIds, NBAPredictions.GAME_ID == NBAGameIds.GAME_ID
    ).join(
        HomeTeam, NBAGameIds.HOME_TEAM_ID == HomeTeam.TEAM_ID
    ).join(
        AwayTeam, NBAGameIds.AWAY_TEAM_ID == AwayTeam.TEAM_ID
    ).filter(
        NBAGameIds.GAME_DATE == date
    ).all()

    # turns queried data into JSON format
    predictions_data = [
        {
            "GAME_ID": ID,
            "HOME_W_PROB": HOME_PROB,
            "AWAY_W_PROB": AWAY_PROB,
            "GAME_DATE": game.GAME_DATE,
            "HOME_TEAM": HOME_NAME,
            "AWAY_TEAM": AWAY_NAME,
            "HOME_LOGO": HOME_LOGO,
            "AWAY_LOGO": AWAY_LOGO,
        }
        for ID, HOME_PROB, AWAY_PROB, game, HOME_NAME, AWAY_NAME, HOME_LOGO, AWAY_LOGO in predictions
        # loops through each section in predictions
    ]

    # loops through dictionaries within the predictions_data list
    # and filters for the first game log with that specific game id
    for prediction in predictions_data:
        pred = db.session.query(
            NBAGameLogs
        ).filter(
            NBAGameLogs.GAME_ID == prediction["GAME_ID"]
        ).first()

        # checks to see if the team nickname of the queried game log 
        # is a the home team of the current prediction dict.
        # If it is, then it adds TEAM_W_LOOK and TEAM_W to determine which team
        # won. TEAM_W_LOOK is associated with TEAM_W. If not,
        # it is the away team, so that is added.
        if pred.NICKNAME in prediction["HOME_TEAM"]:
            prediction.update({"TEAM_W_LOOK": prediction["HOME_TEAM"], "TEAM_W": pred.W}) 
        else:
            prediction.update({"TEAM_W_LOOK": prediction["AWAY_TEAM"], "TEAM_W": pred.W})

    return jsonify(predictions_data)


@main.route('/NBAPredictions/team/<team>/<feature>/<model>')
def fetch_predictions_by_team(team, feature, model):
    """
       Function to grab predictions from db based on team and set of features and ML model

       Parameters:
       team -- team name to pull for
       feature -- feature set to pull for
       model -- ML model to pull for
    """

    # normalizes teams with spaces in their nicknames, so they can be parameterized correctly
    team_norm = team.replace('-', ' ')

    # calls an alias of the nbateams table as the home team
    HomeTeam = aliased(NBATeam)
    # calls an alias of the nbateams table as the away team
    AwayTeam = aliased(NBATeam)

    # combines names for feature and model
    name_h = feature + "_" + model + "_HOME_W_PROB"
    name_a = feature + "_" + model + "_AWAY_W_PROB"

    # calls the specific column from nbapredictions table in database
    # based on combined name
    home_probs = getattr(NBAPredictions, name_h)
    away_probs = getattr(NBAPredictions, name_a)

    # queries nbapredictions, nbagameids, nbagamelogs, and nbateams,
    # joining GAME_ID of nbapredictions and nbagameids for TEAM_IDs,
    # joining TEAM_ID of nbagameids and aliased nbateams for TEAM_NAMEs,
    # joining GAME_ID of nbagameids and nbagamelogs for TEAM_NICKNAME
    # filtering by a specific TEAM_NICKNAME,
    # ordering by descending GAME_DATE and grabbing all results
    predictions = db.session.query(
        NBAPredictions.GAME_ID,
        home_probs.label("home_probs"),
        away_probs.label("away_probs"),
        NBAGameIds,
        NBAGameLogs,
        HomeTeam.TEAM_NAME.label("HOME_TEAM_NAME"),
        AwayTeam.TEAM_NAME.label("AWAY_TEAM_NAME"),
        HomeTeam.TEAM_LOGO.label("HOME_LOGO"),
        AwayTeam.TEAM_LOGO.label("AWAY_LOGO")
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

    # turn queried data into JSON format
    predictions_data = [
        {
            "GAME_ID": ID,
            "HOME_W_PROB": HOME_PROB,
            "AWAY_W_PROB": AWAY_PROB,
            "GAME_DATE": game.GAME_DATE,
            "HOME_TEAM": HOME_NAME,
            "AWAY_TEAM": AWAY_NAME,
            "TEAM_W": log.W,
            "HOME_LOGO": HOME_LOGO,
            "AWAY_LOGO": AWAY_LOGO
        }
        for ID, HOME_PROB, AWAY_PROB, game, log, HOME_NAME, AWAY_NAME, HOME_LOGO, AWAY_LOGO in predictions
        # looping through sections in predictions
    ]

    # loops through prediction dicts in the predictions_data list
    for prediction in predictions_data:
        # checks to see selected team is the home team or away team of the
        # current dict. Depending on which one, it adds that team under
        # a new key "TEAM_W_LOOK". This allows for "TEAM_W" to be associated
        # with a specific team, so the frontend can know who won.
        if team_norm in prediction["HOME_TEAM"]:
            prediction.update({"TEAM_W_LOOK": prediction["HOME_TEAM"]})
        else:
            prediction.update({"TEAM_W_LOOK": prediction["AWAY_TEAM"]})

    return jsonify(predictions_data)

'''
    I referenced chatgpt for help creating methods for adding users and login 
    Chat Link: https://chatgpt.com/share/67e49261-fcfc-800f-a302-03d2a6125d48
    
    I later changed these methods to accept JSON code as I was implemented the flask pages. 
    This is the conversation where I was getting help making the registration page where it told 
    me that it is necessary to accept the POST request as JSON for my register and login methods 
    on the backend. 

    Chat Link: https://chatgpt.com/share/680bdac0-d934-800f-9df0-5c9aa2011ecc 
'''


@main.route('/add', methods=['GET', 'POST'])
def add_user():
    """Function to add a user to the database
       
       Return:
       register page html template as a static element or a redirect to the main page
       once added
    """
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

@main.route('/login', methods=['POST'])
def login():
    """Function to login user that is already in the database.
       
       Return:
       JSONed message or error based on if login was successful
    """
    data = request.get_json()  
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(email=username).first()

    if user and user.check_password(password):
        # Set session data 
        session['user_id'] = user.id 
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401


'''
    I did not implement the login page on the front end for a while until I eventually worked on the login 
    and registration pages in react. I had to change this methods to accept JSON POST requests and
    accept JSON Data. At this point, I learned more about Flask sessions and user management. We do have
    not currently implemented get current user and integrated it on the frontend as it would have required 
    adding checkLogin() on each page in react and we had no reason to do that at this point in the project. 
    These methods give us a base to go off of when we revisit implementation of users. The discussion in which 
    I made the login page and and began to implement get current user before discovering how much work it would
    be on the frontend. 

    Chat Link: https://chatgpt.com/c/6802f43c-9a8c-800f-96ab-6bbfe82176a0
'''
@main.route('/user', methods=['GET'])
def get_current_user():
    """Function to get data of current user
       
       Return:
       JSON resonse message indicating the current user
    """
    user_id = session.get('user_id')
    
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404

    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
    }

    return jsonify(user_data), 200