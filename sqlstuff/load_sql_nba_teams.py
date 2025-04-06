"""Static file that intialiy loads team information to the database for use within the application.
   This file only needs to run once.

   author = Kade Townsend
"""

import pandas as pd
import sqlalchemy_interact
# gets team info from nba api by swar
from nba_api.stats.static import teams

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

# insert df into database as "nbateams"
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(nba_teams_df, "nbateams")
