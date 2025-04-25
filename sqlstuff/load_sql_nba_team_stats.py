"""
   Static file that initially loads NBA team game statistics data to the database for use within the application.
   This file only needs to run once. I switched the season to be the season corresponding to the file that I wanted
   to upload. 

   Author: Timothy Berlanga

   I used ChatGPT for help generating the script to upload my data based on the csv file and my other upload scripts. 
   I typically had to edit the rows and path but it gave me a good starting point. 
   
   Chat Link: https://chatgpt.com/share/6807185c-99d0-800f-a459-45b68633d38e 
"""

import pandas as pd
import sqlalchemy_interact


# Path to your team stats CSV
CSV_PATH = "../NBA/TeamStats/TeamStats - NBA24.csv"

# Load CSV
df = pd.read_csv(CSV_PATH)

df['SEASON'] = '2024'

# Rename columns
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

# Preview the cleaned DataFrame
print(df.head())

# Push to DB
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(df, "nbateamstats")
