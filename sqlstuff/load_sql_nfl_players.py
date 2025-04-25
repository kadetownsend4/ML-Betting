"""
    Static Script file to initially load NFL player data from CSV into MySQL database using SQLAlchemy.

    Author: Timothy Berlanga

    I used ChatGPT for help generating the script to upload my data based on the csv file
    
    Chat Link: https://chatgpt.com/share/67fae08f-148c-800f-bbeb-79064e423c39
"""

import pandas as pd
import sqlalchemy_interact  # your custom DB interface

# Load the NFL player CSV
df = pd.read_csv("NFL/Team Data/team_roster_data_filtered.csv")  # Update the path if different

# Clean string columns (strip whitespace)
string_cols = df.select_dtypes(include='object').columns
df[string_cols] = df[string_cols].apply(lambda x: x.str.strip())
df = df.drop(columns={"jersey_number"})

# Optional: Rename columns to match your DB schema or naming conventions
df = df.rename(columns={
    "season": "SEASON",
    "team": "TEAM",
    "team_id": "TEAM_ID",
    "player_id": "PLAYER_ID",
    "player_name": "PLAYER_NAME",
    "first_name": "FIRST_NAME",
    "last_name": "LAST_NAME",
    "position": "POSITION",
    "status": "STATUS",
    "game_type": "GAME_TYPE"
})

# Upload the DataFrame to MySQL under the table name "nfl_players"
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(df, "nfl_players")

print("NFL player data uploaded successfully to 'nfl_players' table.")
