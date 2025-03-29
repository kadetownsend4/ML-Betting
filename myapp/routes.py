from flask import Blueprint, render_template, jsonify, request, redirect, url_for, flash
from .models import User, NFLTeam
from .extensions import db 

main = Blueprint('main', __name__)

@main.route('/')
def index():
    users = User.query.all()
    users_list_html = [f"<li>{user.username}</li>" for user in users]
    return f"<ul>{''.join(users_list_html)}</ul>"

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

