"""Static file that initially loads NFL team data to the database for use within the application.
   This file only needs to run once.

   author = Timothy Berlanga

   I used ChatGPT for help generating the script to upload my data based on the csv file
https://chatgpt.com/share/67fae08f-148c-800f-bbeb-79064e423c39
"""

import pandas as pd
import sqlalchemy_interact
# Load team data from CSV file
df = pd.read_csv("NFL/team_data/team_data.csv")

# Optional: Clean/strip string fields
string_cols = df.select_dtypes(include='object').columns
df[string_cols] = df[string_cols].apply(lambda x: x.str.strip())

# Rename columns (this part should be customized based on how you want them renamed)
# For example, you can map the old column names to the new ones
column_rename_dict = {
    'team_id': 'TEAM_ID',
    'team_name': 'TEAM_NAME',
    'team_abbr': 'TEAM_ABR',
    'team_nick': 'TEAM_NICKNAME',
    'team_conf': 'TEAM_CONF',
    'team_division': 'TEAM_DIVISION',
    'team_logo_espn': 'TEAM_LOGO',
    'team_wordmark': 'TEAM_WORDMARK'
}

# Apply the renaming
df.rename(columns=column_rename_dict, inplace=True)

# Insert the cleaned and renamed DataFrame into the database under the table "nfl_teams"
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(df, "nfl_teams")

print("Data uploaded successfully!")