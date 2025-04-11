# https://chatgpt.com/share/67e49261-fcfc-800f-a302-03d2a6125d48 
# The code below was used to upload csv files to the database after a model was created.
# I had ChatGPT help structuring the function to give me an idea of how this should be done.
# def upload_team_rosters(file_path):
#     with app.app_context():
#         # Read CSV data
#         with open(file_path, 'r') as file:
#             reader = csv.DictReader(file)
            
#             print("Team rosters being read!")
#             for row in reader:
#                 # Check if the team exists
#                 team = NFLTeam.query.filter_by(TEAM_ID=row['team_id']).first()
#                 if team:
#                     # Check if the player already exists to avoid duplicates
#                     existing_player = NFLPlayer.query.filter_by(PLAYER_ID=row['player_id']).first()
#                     if not existing_player:
#                         player = NFLPlayer(
#                             PLAYER_ID=(row['player_id']),
#                             TEAM_ID=team.TEAM_ID,  # Use existing team's ID
#                             SEASON=int(row['season']),
#                             PLAYER_NAME=row['player_name'],
#                             FIRST_NAME=row['first_name'],
#                             LAST_NAME=row['last_name'],
#                             POSITION=row['position'],
#                             STATUS=row.get('status', None),
#                             WEEK=int(row['week']) if row.get('week') else None,
#                             GAME_TYPE=row.get('game_type', None)
#                         )
#                         db.session.add(player)
            
#             # Commit all changes
#             db.session.commit()
#             print("Team rosters uploaded successfully!")

# upload_team_rosters('team_roster_data_filtered.csv')  # Adjust the CSV file name if necessary

# def upload_teams(file_path):
#     with app.app_context():
#         # Read CSV data
#         with open(file_path, 'r') as file:
#             reader = csv.DictReader(file)
            
#             for row in reader:
#                 # Check if the team already exists to avoid duplicates
#                 existing_team = NFLTeam.query.filter_by(TEAM_ID=row['team_id']).first()
#                 if not existing_team:
#                     team = NFLTeam(
#                         TEAM_ID=int(row['team_id']),
#                         TEAM_NAME=row['team_name'],
#                         TEAM_ABR=row['team_abbr'],
#                         TEAM_NICKNAME=row['team_nick'],
#                         TEAM_CONF=row['team_conf'],
#                         TEAM_DIVISION=row['team_division'],
#                         TEAM_LOGO=row['team_logo_espn'],
#                         TEAM_WORDMARK=row['team_wordmark'],
#                     )
#                     db.session.add(team)
#             db.session.commit()


#         # Commit all changes
#         db.session.commit()
#         print("Data uploaded successfully!")

# upload_teams('team_data.csv')
# # with app.app_context():
# #     upload_teams('team_data.csv')
