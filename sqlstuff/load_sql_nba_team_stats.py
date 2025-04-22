"""
Script to upload NBA team stats from CSV into the database.

Run this once to seed your 'nba_team_stats' table.

Author: Kade Townsend & Timothy Berlanga
"""

import pandas as pd
import sqlalchemy_interact


# Path to your team stats CSV
CSV_PATH = "../NBA/TeamStats/TeamStats - NBA24.csv"

# Load CSV
df = pd.read_csv(CSV_PATH)

df['SEASON'] = '2024'

# Rename columns: ALL CAPS + SQL FRIENDLY
df.rename(columns={
    'TeamID': 'TEAM_ID',
    'Team': 'TEAM',
    'GP': 'GP',
    'W': 'W',
    'L': 'L',
    'WIN%': 'WIN_PCT',
    'Min': 'Min',
    'PTS': 'PTS',
    'FGM': 'FGM',
    'FGA': 'FGA',
    'FG%': 'FG_PCT',
    '3:00 PM': 'THREE_PM',
    '3PA': 'THREE_PA',
    '3P%': 'THREE_PCT',
    'FTM': 'FTM',
    'FTA': 'FTA',
    'FT%': 'FT_PCT',
    'OREB': 'OREB',
    'DREB': 'DREB',
    'REB': 'REB',
    'AST': 'AST',
    'TOV': 'TOV',
    'STL': 'STL',
    'BLK': 'BLK',
    'BLKA': 'BLKA',
    'PF': 'PF',
    'PFD': 'PFD',
    'Plus/Minus': 'PLUS_MINUS'
}, inplace=True)

# 🔍 Preview the cleaned DataFrame
print(df.head())


# 🚀 Push to DB
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(df, "nbateamstats")
