"""Static file that initially loads team ids for every matchup along with game ids and game dates.
   This data is loaded to the database.

   author = Kade Townsend
"""

import sqlalchemy_interact
import pandas as pd

# gets the nba game logs from the database as a pandas dataframe
data = sqlalchemy_interact.get_df_from_mysql_sqlalchemy(
    'nbagamelogs')
data = data.dropna()
gameDF = data
gamedf = data

# creates two frames, one for home team and one for away teams
# allows for the combination process to begin
homeTeamFrame = gameDF[gameDF['CITY'] != 'OPPONENTS']
awayTeamFrame = gamedf[gamedf['CITY'] == 'OPPONENTS']

# dwindles columns down to only what is needed for this table
# game_date is only needed once
homeTeamFrame = homeTeamFrame[['GAME_ID', 'GAME_DATE', 'SEASON', 'TEAM_ID']]
awayTeamFrame = awayTeamFrame[['GAME_ID', 'SEASON', 'TEAM_ID']]

# merges the two frames together, so game_id will be in correspondance with both home and away ids
colRenameDict = {}
# add HOME in front of home stats
for col in homeTeamFrame.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'HOME_' + col
homeTeamFrame.rename(columns=colRenameDict, inplace=True)
colRenameDict = {}
# add AWAY in front of away stats
for col in awayTeamFrame.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'AWAY_' + col
awayTeamFrame.rename(columns=colRenameDict, inplace=True)
# merge home and away features together
data = pd.merge(homeTeamFrame, awayTeamFrame,
                how="inner", on=["GAME_ID", "SEASON"])

# don't need season if have date
data = data.drop(['SEASON'], axis=1)

# uploads df to the database
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(data, "nbagameids")
