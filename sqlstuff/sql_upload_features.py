""" import sqlalchemy_interact
import pandas as pd

# something wrong with interact engine for reading data, will fix later
data = pd.read_csv("GettingData/gameLogs.csv")

data.dropna()
# true shooting percentage
data["TS_PCT"] = data["PTS"]/(2*(data["FGA"]+(0.475*data["FTA"])))
# steals + blocks
data["STL+BLK"] = data["STL"] + data["BLK"]
# weighted turnover percentage
data["TOV_PCT"] = data["TOTAL_TURNOVERS"] / \
    (data["FGA"]+(0.475*data["FTA"])+data["AST"]+data["TOTAL_TURNOVERS"])
data['LAST_GAME_OE'] = data.sort_values('GAME_DATE').groupby(
    ['TEAM_ID', 'SEASON'])['OFFENSIVE_EFFICIENCY'].shift(1)
data['LAST_GAME_HOME_WIN_PCTG'] = data.sort_values('GAME_DATE').groupby(
    ['TEAM_ID', 'SEASON'])['HOME_WIN_PCTG'].shift(1)
data['LAST_GAME_AWAY_WIN_PCTG'] = data.sort_values('GAME_DATE').groupby(
    ['TEAM_ID', 'SEASON'])['AWAY_WIN_PCTG'].shift(1)
data['LAST_GAME_TOTAL_WIN_PCTG'] = data.sort_values('GAME_DATE').groupby(
    ['TEAM_ID', 'SEASON'])['TOTAL_WIN_PCTG'].shift(1)
data['LAST_GAME_ROLLING_SCORING_MARGIN'] = data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['ROLLING_SCORING_MARGIN'].shift(1)
data['LAST_GAME_ROLLING_OE'] = data.sort_values('GAME_DATE').groupby(
    ['TEAM_ID', 'SEASON'])['ROLLING_OE'].shift(1)
data['LAST_3_GAME_AVG_OE'] = (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['OFFENSIVE_EFFICIENCY'].shift(1) + data.sort_values('GAME_DATE').groupby(
    ['TEAM_ID', 'SEASON'])['OFFENSIVE_EFFICIENCY'].shift(2) + data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['OFFENSIVE_EFFICIENCY'].shift(3))/3
data['LAST_3_GAME_AVG_HOME_WIN_PCTG'] = (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['HOME_WIN_PCTG'].shift(1) + data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['HOME_WIN_PCTG'].shift(2) + data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['HOME_WIN_PCTG'].shift(3))/3
data['LAST_3_GAME_AVG_AWAY_WIN_PCTG'] = (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['AWAY_WIN_PCTG'].shift(1) + data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['AWAY_WIN_PCTG'].shift(2) + data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['AWAY_WIN_PCTG'].shift(3))/3
data['LAST_3_GAME_AVG_TOTAL_WIN_PCTG'] = (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TOTAL_WIN_PCTG'].shift(1) + data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TOTAL_WIN_PCTG'].shift(2) + data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TOTAL_WIN_PCTG'].shift(3))/3
data['LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN'] = (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['ROLLING_SCORING_MARGIN'].shift(1) + data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['ROLLING_SCORING_MARGIN'].shift(2) + data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['ROLLING_SCORING_MARGIN'].shift(3))/3
data['LAST_3_GAME_AVG_ROLLING_OE'] = (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['ROLLING_OE'].shift(1) + data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['ROLLING_OE'].shift(2) + data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['ROLLING_OE'].shift(3))/3
data["LAST_3_GAME_AVG_TS_PCT"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TS_PCT'].shift(1)) + (data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TS_PCT'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TS_PCT'].shift(3)))/3
data["LAST_3_GAME_AVG_FG3_PCT"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['FG3_PCT'].shift(1)) + (data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['FG3_PCT'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['FG3_PCT'].shift(3)))/3
data["LAST_3_GAME_AVG_TOT_REB"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TOT_REB'].shift(1)) + (data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TOT_REB'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TOT_REB'].shift(3)))/3
data["LAST_3_GAME_AVG_STL+BLK"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['STL+BLK'].shift(1)) + (data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['STL+BLK'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['STL+BLK'].shift(3)))/3
data["LAST_3_GAME_AVG_TOV_PCT"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TOV_PCT'].shift(1)) + (data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TOV_PCT'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TOV_PCT'].shift(3)))/3
data["LAST_3_GAME_AVG_PTS"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['PTS'].shift(1)) + (data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['PTS'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['PTS'].shift(3)))/3
data["LAST_3_GAME_AVG_FG_PCT"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['FG_PCT'].shift(1)) + (data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['FG_PCT'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['FG_PCT'].shift(3)))/3
data["LAST_3_GAME_AVG_FT_PCT"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['FT_PCT'].shift(1)) + (data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['FT_PCT'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['FT_PCT'].shift(3)))/3
data["LAST_3_GAME_AVG_AST"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['AST'].shift(1)) + (data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['AST'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['AST'].shift(3)))/3
data["LAST_3_GAME_AVG_STL"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['STL'].shift(1)) + (data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['STL'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['STL'].shift(3)))/3
data["LAST_3_GAME_AVG_TOTAL_TURNOVERS"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TOTAL_TURNOVERS'].shift(1)) + (data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TOTAL_TURNOVERS'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['TOTAL_TURNOVERS'].shift(3)))/3
data["LAST_3_GAME_AVG_BLK"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['BLK'].shift(1)) + (data.sort_values(
    'GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['BLK'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID', 'SEASON'])['BLK'].shift(3)))/3
data = data.dropna()
gameDF = data
gamedf = data
# split data into home and away
homeTeamFrameREG = gameDF[gameDF['CITY'] != 'OPPONENTS']
awayTeamFrameREG = gamedf[gamedf['CITY'] == 'OPPONENTS']
homeTeamFrameCF = gameDF[gameDF['CITY'] != 'OPPONENTS']
awayTeamFrameCF = gamedf[gamedf['CITY'] == 'OPPONENTS']
homeTeamFrameFE = gameDF[gameDF['CITY'] != 'OPPONENTS']
awayTeamFrameFE = gamedf[gamedf['CITY'] == 'OPPONENTS']
homeTeamFrameOG = gameDF[gameDF['CITY'] != 'OPPONENTS']
awayTeamFrameOG = gamedf[gamedf['CITY'] == 'OPPONENTS']
homeTeamFrameOG3 = gameDF[gameDF['CITY'] != 'OPPONENTS']
awayTeamFrameOG3 = gamedf[gamedf['CITY'] == 'OPPONENTS']

homeTeamFrameREG = homeTeamFrameREG[['LAST_3_GAME_AVG_OE', 'LAST_3_GAME_AVG_HOME_WIN_PCTG', 'NUM_REST_DAYS', 'LAST_3_GAME_AVG_AWAY_WIN_PCTG', 'LAST_3_GAME_AVG_TOTAL_WIN_PCTG', 'LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN', 'LAST_3_GAME_AVG_ROLLING_OE', 'W', 'TEAM_ID', 'GAME_ID', 'GAME_DATE',
                                     'SEASON', "LAST_3_GAME_AVG_FG_PCT", "LAST_3_GAME_AVG_FG3_PCT", "LAST_3_GAME_AVG_FT_PCT", "LAST_3_GAME_AVG_TOT_REB", "LAST_3_GAME_AVG_AST", "LAST_3_GAME_AVG_STL", "LAST_3_GAME_AVG_TOTAL_TURNOVERS", "LAST_3_GAME_AVG_BLK", "LAST_3_GAME_AVG_PTS"]]
awayTeamFrameREG = awayTeamFrameREG[['LAST_3_GAME_AVG_OE', 'LAST_3_GAME_AVG_HOME_WIN_PCTG', 'NUM_REST_DAYS', 'LAST_3_GAME_AVG_AWAY_WIN_PCTG', 'LAST_3_GAME_AVG_TOTAL_WIN_PCTG', 'LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN', 'LAST_3_GAME_AVG_ROLLING_OE', 'TEAM_ID', 'GAME_ID',
                                     'SEASON', "LAST_3_GAME_AVG_FG_PCT", "LAST_3_GAME_AVG_FG3_PCT", "LAST_3_GAME_AVG_FT_PCT", "LAST_3_GAME_AVG_TOT_REB", "LAST_3_GAME_AVG_AST", "LAST_3_GAME_AVG_STL", "LAST_3_GAME_AVG_TOTAL_TURNOVERS", "LAST_3_GAME_AVG_BLK", "LAST_3_GAME_AVG_PTS"]]
homeTeamFrameCF = homeTeamFrameCF[['LAST_3_GAME_AVG_OE', 'LAST_3_GAME_AVG_TOTAL_WIN_PCTG', 'LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN',
                                   'LAST_3_GAME_AVG_ROLLING_OE', 'W', 'TEAM_ID', 'GAME_ID', 'GAME_DATE', 'SEASON', "LAST_3_GAME_AVG_TS_PCT", "LAST_3_GAME_AVG_FG3_PCT", "LAST_3_GAME_AVG_PTS"]]
awayTeamFrameCF = awayTeamFrameCF[['LAST_3_GAME_AVG_OE', 'LAST_3_GAME_AVG_TOTAL_WIN_PCTG', 'LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN',
                                   'LAST_3_GAME_AVG_ROLLING_OE', 'TEAM_ID', 'GAME_ID', 'SEASON', "LAST_3_GAME_AVG_TS_PCT", "LAST_3_GAME_AVG_TOTAL_TURNOVERS", "LAST_3_GAME_AVG_PTS"]]
homeTeamFrameFE = homeTeamFrameFE[['LAST_3_GAME_AVG_OE', 'NUM_REST_DAYS', 'LAST_3_GAME_AVG_TOTAL_WIN_PCTG', 'LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN', 'LAST_3_GAME_AVG_ROLLING_OE', 'W', 'TEAM_ID',
                                   'GAME_ID', 'GAME_DATE', 'SEASON', "LAST_3_GAME_AVG_TS_PCT", "LAST_3_GAME_AVG_FG3_PCT", "LAST_3_GAME_AVG_TOT_REB", "LAST_3_GAME_AVG_STL+BLK", "LAST_3_GAME_AVG_TOV_PCT", "LAST_3_GAME_AVG_PTS"]]
awayTeamFrameFE = awayTeamFrameFE[['LAST_3_GAME_AVG_OE', 'NUM_REST_DAYS', 'LAST_3_GAME_AVG_TOTAL_WIN_PCTG', 'LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN', 'LAST_3_GAME_AVG_ROLLING_OE', 'TEAM_ID',
                                   'GAME_ID', 'SEASON', "LAST_3_GAME_AVG_TS_PCT", "LAST_3_GAME_AVG_FG3_PCT", "LAST_3_GAME_AVG_TOT_REB", "LAST_3_GAME_AVG_STL+BLK", "LAST_3_GAME_AVG_TOV_PCT", "LAST_3_GAME_AVG_PTS"]]
homeTeamFrameOG = homeTeamFrameOG[['LAST_GAME_OE', 'LAST_GAME_HOME_WIN_PCTG', 'NUM_REST_DAYS', 'LAST_GAME_AWAY_WIN_PCTG',
                                   'LAST_GAME_TOTAL_WIN_PCTG', 'LAST_GAME_ROLLING_SCORING_MARGIN', 'LAST_GAME_ROLLING_OE', 'W', 'TEAM_ID', 'GAME_ID', 'GAME_DATE', 'SEASON']]
awayTeamFrameOG = awayTeamFrameOG[['LAST_GAME_OE', 'LAST_GAME_HOME_WIN_PCTG', 'NUM_REST_DAYS', 'LAST_GAME_AWAY_WIN_PCTG',
                                   'LAST_GAME_TOTAL_WIN_PCTG', 'LAST_GAME_ROLLING_SCORING_MARGIN', 'LAST_GAME_ROLLING_OE', 'TEAM_ID', 'GAME_ID', 'SEASON']]
homeTeamFrameOG3 = homeTeamFrameOG3[['LAST_3_GAME_AVG_OE', 'LAST_3_GAME_AVG_HOME_WIN_PCTG', 'NUM_REST_DAYS', 'LAST_3_GAME_AVG_AWAY_WIN_PCTG',
                                     'LAST_3_GAME_AVG_TOTAL_WIN_PCTG', 'LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN', 'LAST_3_GAME_AVG_ROLLING_OE', 'W', 'TEAM_ID', 'GAME_ID', 'GAME_DATE', 'SEASON']]
awayTeamFrameOG3 = awayTeamFrameOG3[['LAST_3_GAME_AVG_OE', 'LAST_3_GAME_AVG_HOME_WIN_PCTG', 'NUM_REST_DAYS', 'LAST_3_GAME_AVG_AWAY_WIN_PCTG',
                                     'LAST_3_GAME_AVG_TOTAL_WIN_PCTG', 'LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN', 'LAST_3_GAME_AVG_ROLLING_OE', 'TEAM_ID', 'GAME_ID', 'SEASON']]


colRenameDict = {}
# add HOME in front of home stats
for col in homeTeamFrameREG.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'HOME_' + col
homeTeamFrameREG.rename(columns=colRenameDict, inplace=True)
colRenameDict = {}
# add AWAY in front of away stats
for col in awayTeamFrameREG.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'AWAY_' + col
awayTeamFrameREG.rename(columns=colRenameDict, inplace=True)

colRenameDict = {}
# add HOME in front of home stats
for col in homeTeamFrameCF.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'HOME_' + col
homeTeamFrameCF.rename(columns=colRenameDict, inplace=True)
colRenameDict = {}
# add AWAY in front of away stats
for col in awayTeamFrameCF.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'AWAY_' + col
awayTeamFrameCF.rename(columns=colRenameDict, inplace=True)

colRenameDict = {}
# add HOME in front of home stats
for col in homeTeamFrameFE.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'HOME_' + col
homeTeamFrameFE.rename(columns=colRenameDict, inplace=True)
colRenameDict = {}
# add AWAY in front of away stats
for col in awayTeamFrameFE.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'AWAY_' + col
awayTeamFrameFE.rename(columns=colRenameDict, inplace=True)

colRenameDict = {}
# add HOME in front of home stats
for col in homeTeamFrameOG.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'HOME_' + col
homeTeamFrameOG.rename(columns=colRenameDict, inplace=True)
colRenameDict = {}
# add AWAY in front of away stats
for col in awayTeamFrameOG.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'AWAY_' + col
awayTeamFrameOG.rename(columns=colRenameDict, inplace=True)

colRenameDict = {}
# add HOME in front of home stats
for col in homeTeamFrameOG3.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'HOME_' + col
homeTeamFrameOG3.rename(columns=colRenameDict, inplace=True)
colRenameDict = {}
# add AWAY in front of away stats
for col in awayTeamFrameOG3.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'AWAY_' + col
awayTeamFrameOG3.rename(columns=colRenameDict, inplace=True)


# merge home and away features together
dataREG = pd.merge(homeTeamFrameREG, awayTeamFrameREG,
                   how="inner", on=["GAME_ID", "SEASON"])
dataCF = pd.merge(homeTeamFrameCF, awayTeamFrameCF,
                  how="inner", on=["GAME_ID", "SEASON"])
dataFE = pd.merge(homeTeamFrameFE, awayTeamFrameFE,
                  how="inner", on=["GAME_ID", "SEASON"])
dataOG = pd.merge(homeTeamFrameOG, awayTeamFrameOG,
                  how="inner", on=["GAME_ID", "SEASON"])
dataOG3 = pd.merge(homeTeamFrameOG3, awayTeamFrameOG3,
                   how="inner", on=["GAME_ID", "SEASON"])

sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(dataREG, "reg")
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(dataCF, "cf")
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(dataFE, "fe")
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(dataOG, "og")
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(dataOG3, "ogthree")
 """
