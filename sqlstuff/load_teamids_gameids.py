import sqlalchemy_interact
import pandas as pd

data = sqlalchemy_interact.get_df_from_mysql_sqlalchemy(
    'nbagamelogs')
data = data.dropna()
gameDF = data
gamedf = data

homeTeamFrame = gameDF[gameDF['CITY'] != 'OPPONENTS']
awayTeamFrame = gamedf[gamedf['CITY'] == 'OPPONENTS']

homeTeamFrame = homeTeamFrame[['GAME_ID', 'GAME_DATE', 'SEASON', 'TEAM_ID']]
awayTeamFrame = awayTeamFrame[['GAME_ID', 'SEASON', 'TEAM_ID']]

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

data = data.drop(['SEASON'], axis=1)

sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(data, "nbagameids")
