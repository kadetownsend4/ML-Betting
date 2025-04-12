"""
Script to load NFL player data from CSV into MySQL database using SQLAlchemy.

Author: Timothy Berlanga
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
