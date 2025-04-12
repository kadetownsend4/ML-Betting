"""Static file that intialiy loads team information to the database for use within the application.
   This file only needs to run once.

   author = Kade Townsend
"""

import pandas as pd
import sqlalchemy_interact
# gets team info from nba api by swar
from nba_api.stats.static import teams

def get_team_assets():
    nba_teams = teams.get_teams()  # Fetch all NBA teams
    assets = {}

    for team in nba_teams:
        team_id = team['id']
        team_name = team['full_name']
        
        # Logo URL (SVG format)
        logo_url = f"https://cdn.nba.com/logos/nba/{team_id}/global/L/logo.svg"
        
        assets[team_name] = {
            'logo': logo_url,
        }

    return assets

# Get team logos and wordmarks
team_assets = get_team_assets()
print(team_assets)


# api call
nba_teams = teams.get_teams()
nba_teams_df = pd.DataFrame.from_dict(nba_teams)
# rename columns of df for better use within application
nba_teams_df.rename(columns={'id': 'TEAM_ID', 'full_name': 'TEAM_NAME', 'abbreviation': 'TEAM_ABR', 'nickname': 'TEAM_NICKNAME',
                    'city': 'TEAM_CITY', 'state': 'TEAM_STATE', 'year_founded': 'TEAM_YEAR_FOUNDED'}, inplace=True)
# rename some cities of the nba teams as they were wrong
nba_teams_df.at[7, 'TEAM_CITY'] = "San Francisco"
nba_teams_df.at[13, 'TEAM_CITY'] = "Minneapolis"
nba_teams_df.at[15, 'TEAM_CITY'] = "New York City"
nba_teams_df.at[17, 'TEAM_CITY'] = "Indianapolis"
nba_teams_df.at[25, 'TEAM_CITY'] = "Salt Lake City"

# Rename columns for better use within the application
nba_teams_df.rename(columns={
    'id': 'TEAM_ID', 
    'full_name': 'TEAM_NAME', 
    'abbreviation': 'TEAM_ABR', 
    'nickname': 'TEAM_NICKNAME',
    'city': 'TEAM_CITY', 
    'state': 'TEAM_STATE', 
    'year_founded': 'TEAM_YEAR_FOUNDED'

}, inplace=True)

# Manually correct the city names for some teams (based on your previous input)
nba_teams_df.at[7, 'TEAM_CITY'] = "San Francisco"
nba_teams_df.at[13, 'TEAM_CITY'] = "Minneapolis"
nba_teams_df.at[15, 'TEAM_CITY'] = "New York City"
nba_teams_df.at[17, 'TEAM_CITY'] = "Indianapolis"
nba_teams_df.at[25, 'TEAM_CITY'] = "Salt Lake City"

# Add logos to the DataFrame
nba_teams_df['TEAM_LOGO'] = nba_teams_df['TEAM_NAME'].apply(lambda team_name: team_assets.get(team_name, {}).get('logo', None))

# Print the updated DataFrame to ensure logos are included
print(nba_teams_df[['TEAM_NAME', 'TEAM_LOGO']])

# insert df into database as "nbateams"
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(nba_teams_df, "nbateams")
