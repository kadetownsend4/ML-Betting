"""
    Static file that loads NFL receiving weekly stats data to the database for use within the application.
    This file only needs to run once.

    author = Timothy Berlanga
   
    I used ChatGPT for help generating the script to upload my data based on the csv file and my other upload scripts. 
    I typically had to edit the rows and path but it gave me a good starting point. 

    Chat Link: https://chatgpt.com/share/680bc023-a7f4-800f-ad6f-91c87a88a1f5
"""

import pandas as pd
# Handles database upload
import sqlalchemy_interact 

# Load WR/TE/RB weekly receiving stats data from CSV
df = pd.read_csv("NFL/weekly_nfl_stats_season/complete_wr_df.csv")

# Clean/strip string fields
string_cols = df.select_dtypes(include='object').columns
df[string_cols] = df[string_cols].apply(lambda x: x.str.strip())

# Rename columns to match the model
column_rename_dict = {
    'player_id': 'PLAYER_ID',
    'player_name': 'PLAYER_NAME',
    'player_abbr': 'PLAYER_ABBR',
    'game_id': 'GAME_ID',
    'week': 'WEEK',
    'recent_team': 'RECENT_TEAM',
    'opponent_team': 'OPPONENT_TEAM',
    'season': 'SEASON',
    'season_type': 'SEASON_TYPE',
    'position': 'POSITION',
    'headshot_url': 'HEADSHOT_URL',
    'receptions': 'RECEPTIONS',
    'targets': 'TARGETS',
    'receiving_yards': 'RECEIVING_YARDS',
    'receiving_tds': 'RECEIVING_TDS',
    'receiving_fumbles': 'RECEIVING_FUMBLES',
    'receiving_fumbles_lost': 'RECEIVING_FUMBLES_LOST',
    'receiving_air_yards': 'RECEIVING_AIR_YARDS',
    'receiving_yards_after_catch': 'RECEIVING_YARDS_AFTER_CATCH',
    'receiving_first_downs': 'RECEIVING_FIRST_DOWNS',
    'receiving_epa': 'RECEIVING_EPA',
    'receiving_2pt_conversions': 'RECEIVING_2PT_CONVERSIONS',
    'racr': 'RACR',
    'target_share': 'TARGET_SHARE',
    'air_yards_share': 'AIR_YARDS_SHARE',
    'wopr': 'WOPR',
    'special_teams_tds': 'SPECIAL_TEAMS_TDS',
    'fantasy_points': 'FANTASY_POINTS',
    'fantasy_points_ppr': 'FANTASY_POINTS_PPR',
    'receiving_broken_tackles': 'RECEIVING_BROKEN_TACKLES',
    'receiving_drop': 'RECEIVING_DROP',
    'receiving_drop_pct': 'RECEIVING_DROP_PCT',
    'receiving_int': 'RECEIVING_INT',
    'receiving_rat': 'RECEIVING_RAT',
    'avg_cushion': 'AVG_CUSHION',
    'avg_separation': 'AVG_SEPARATION',
    'avg_intended_air_yards': 'AVG_INTENDED_AIR_YARDS',
    'percent_share_of_intended_air_yards': 'PERCENT_SHARE_OF_INTENDED_AIR_YARDS',
    'avg_yac': 'AVG_YAC',
    'avg_expected_yac': 'AVG_EXPECTED_YAC',
    'avg_yac_above_expectation': 'AVG_YAC_ABOVE_EXPECTATION'
}

# Apply renaming
df.rename(columns=column_rename_dict, inplace=True)

# Upload DataFrame to database
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(df, "nfl_receiving_weekly_stats")

print("NFL receiving weekly stats data uploaded successfully!")

