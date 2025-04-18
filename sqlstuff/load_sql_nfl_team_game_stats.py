"""
   Static file that initially loads NFL team game statistics data to the database for use within the application.
   This file only needs to run once.

   Author: Timothy Berlanga

   I used ChatGPT for help generating the script to upload my data based on the csv file
   https://chatgpt.com/share/67fae08f-148c-800f-bbeb-79064e423c39
"""

import pandas as pd
import sqlalchemy_interact

# Load team game stats data from CSV file
df = pd.read_csv("NFL/Team Data/team_game.csv")

# Drop the index column if it exists
if "Unnamed: 0" in df.columns:
    df.drop(columns=["Unnamed: 0"], inplace=True)

# Clean/strip string fields
string_cols = df.select_dtypes(include='object').columns
df[string_cols] = df[string_cols].apply(lambda x: x.str.strip())

# Replace "LA" with "LAR" in TEAM column —
df["team"] = df["team"].apply(lambda x: "LAR" if x == "LA" else x)

# Rename columns to match your model 
column_rename_dict = {
    'game_id': 'GAME_ID',
    'team': 'TEAM',
    'week': 'WEEK',
    'total_yards': 'TOTAL_YARDS',
    'total_tds': 'TOTAL_TDS',
    'passing_tds': 'PASSING_TDS',
    'rushing_tds': 'RUSHING_TDS',
    'num_plays': 'NUM_PLAYS',
    'avg_epa': 'AVG_EPA',
    'success_rate': 'SUCCESS_RATE',
    'total_rush_yards': 'TOTAL_RUSH_YARDS',
    'rush_attempts': 'RUSH_ATTEMPTS',
    'longest_rush': 'LONGEST_RUSH',
    'rushes_for_loss': 'RUSHES_FOR_LOSS',
    'total_pass_yards': 'TOTAL_PASS_YARDS',
    'pass_attempts': 'PASS_ATTEMPTS',
    'complete_passes': 'COMPLETE_PASSES',
    'incomplete_passes': 'INCOMPLETE_PASSES',
    'sacks': 'SACKS',
    'longest_pass': 'LONGEST_PASS',
    'total_penalty_yards': 'TOTAL_PENALTY_YARDS',
    'fumbles_lost': 'FUMBLES_LOST',
    'interceptions': 'INTERCEPTIONS',
    'third_down_converted': 'THIRD_DOWN_CONVERTED',
    'fourth_down_converted': 'FOURTH_DOWN_CONVERTED',
    'wp': 'WP',
    'home_wp': 'HOME_WP',
    'away_wp': 'AWAY_WP'
}

df.rename(columns=column_rename_dict, inplace=True)

# Insert cleaned and renamed DataFrame into the database
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(df, "nfl_team_game_stats")

print("Team game stats data uploaded successfully!")

