"""
   Static file that initially loads NFL game schedule data to the database for use within the application.
   This file only needs to run once.

   Author: Timothy Berlanga

   I used ChatGPT for help generating the script to upload my data based on the csv file
   https://chatgpt.com/share/68000cf1-1714-800f-a0b5-4afc3d924474
"""

import pandas as pd
import sqlalchemy_interact

# Load game schedule data from CSV file
df = pd.read_csv("NFL/Team Data/team_schedule.csv")

# Drop the index column if it exists
if "Unnamed: 0" in df.columns:
    df.drop(columns=["Unnamed: 0"], inplace=True)

# Clean/strip string fields
string_cols = df.select_dtypes(include='object').columns
df[string_cols] = df[string_cols].apply(lambda x: x.str.strip())

# Rename columns 
# For example, you can map the old column names to the new ones
column_rename_dict = {
    'game_id': 'GAME_ID',
    'home_team': 'HOME_TEAM',
    'away_team': 'AWAY_TEAM',
    'home_score': 'HOME_SCORE',
    'away_score': 'AWAY_SCORE',
    'week': 'WEEK',
}

# Apply the renaming
df.rename(columns=column_rename_dict, inplace=True)

# Replace "LA" with "LAR" in HOME_TEAM and AWAY_TEAM — only if not "LAC"
df["HOME_TEAM"] = df["HOME_TEAM"].apply(lambda x: "LAR" if x == "LA" else x)
df["AWAY_TEAM"] = df["AWAY_TEAM"].apply(lambda x: "LAR" if x == "LA" else x)

# Insert the cleaned and renamed DataFrame into the database under the table "nfl_game_schedule"
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(df, "nfl_game_schedule")

print("Game schedule data uploaded successfully!")

