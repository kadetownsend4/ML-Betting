"""Static file that initially loads team ids for every matchup along with game ids and game dates.
   This data is loaded to the database.

   author = Kade Townsend
"""

import sqlalchemy_interact
import pandas as pd

# Read the game logs CSV directly
df = pd.read_csv("NBA/GettingData/gameLogs.csv")

# Clean up unnecessary columns and strip the 'NICKNAME' string
df = df.drop("Unnamed: 0", axis=1)
df['NICKNAME'] = df['NICKNAME'].str.lstrip()

# Create separate frames for home and away teams
homeTeamFrame = df[df['CITY'] != 'OPPONENTS']
awayTeamFrame = df[df['CITY'] == 'OPPONENTS']

# Reduce columns to the necessary ones for merging (game_date only needed once)
homeTeamFrame = homeTeamFrame[['GAME_ID', 'GAME_DATE', 'SEASON', 'TEAM_ID']]
awayTeamFrame = awayTeamFrame[['GAME_ID', 'SEASON', 'TEAM_ID']]

# Rename columns to differentiate home and away stats
colRenameDict = {}
for col in homeTeamFrame.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'HOME_' + col
homeTeamFrame.rename(columns=colRenameDict, inplace=True)

colRenameDict = {}
for col in awayTeamFrame.columns:
    if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
        colRenameDict[col] = 'AWAY_' + col
awayTeamFrame.rename(columns=colRenameDict, inplace=True)

# Merge home and away team data on GAME_ID and SEASON
merged_data = pd.merge(homeTeamFrame, awayTeamFrame, how="inner", on=["GAME_ID", "SEASON"])

# Drop the SEASON column since GAME_DATE should be sufficient
merged_data = merged_data.drop(['SEASON'], axis=1)

# Insert the merged data into the "nbagameids" table
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(merged_data, "nbagameids")