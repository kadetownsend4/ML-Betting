import mysql.connector
import pandas as pd
import sqlalchemy_interact
from nba_api.stats.static import teams

nba_teams = teams.get_teams()
nba_teams_df = pd.DataFrame.from_dict(nba_teams)
nba_teams_df.rename(columns={'id': 'TEAM_ID', 'full_name': 'TEAM_NAME', 'abbreviation': 'TEAM_ABR', 'nickname': 'TEAM_NICKNAME',
                    'city': 'TEAM_CITY', 'state': 'TEAM_STATE', 'year_founded': 'TEAM_YEAR_FOUNDED'}, inplace=True)
nba_teams_df.at[7, 'TEAM_CITY'] = "San Francisco"
nba_teams_df.at[13, 'TEAM_CITY'] = "Minneapolis"
nba_teams_df.at[15, 'TEAM_CITY'] = "New York City"
nba_teams_df.at[17, 'TEAM_CITY'] = "Indianapolis"
nba_teams_df.at[25, 'TEAM_CITY'] = "Salt Lake City"
# print(nba_teams_df)

sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(nba_teams_df, "NBAteams")
