"""
Static file that loads NFL RB weekly stats data to the database for use within the application.
This file only needs to run once.

author = Timothy Berlanga

I used ChatGPT for help generating the script to upload my data based on the csv file.
"""

import pandas as pd
import sqlalchemy_interact  # Assuming this handles database interactions

# Load RB weekly stats data from CSV
df = pd.read_csv("NFL/weekly_nfl_stats_season/complete_rb_df.csv")

# Optional: Clean/strip string fields
string_cols = df.select_dtypes(include='object').columns
df[string_cols] = df[string_cols].apply(lambda x: x.str.strip())

# Rename columns to match your SQLAlchemy model
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
    
    # Rushing Stats
    'carries': 'CARRIES',
    'rushing_yards': 'RUSHING_YARDS',
    'rushing_tds': 'RUSHING_TDS',
    'rushing_fumbles': 'RUSHING_FUMBLES',
    'rushing_fumbles_lost': 'RUSHING_FUMBLES_LOST',
    'rushing_first_downs': 'RUSHING_FIRST_DOWNS',
    'rushing_epa': 'RUSHING_EPA',
    'rushing_2pt_conversions': 'RUSHING_2PT_CONVERSIONS',

    # Receiving Stats
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
    
    # Fantasy
    'fantasy_points': 'FANTASY_POINTS',
    'fantasy_points_ppr': 'FANTASY_POINTS_PPR',
    
    # Advanced Rushing Metrics
    'rushing_yards_before_contact': 'RUSHING_YARDS_BEFORE_CONTACT',
    'rushing_yards_before_contact_avg': 'RUSHING_YARDS_BEFORE_CONTACT_AVG',
    'rushing_yards_after_contact': 'RUSHING_YARDS_AFTER_CONTACT',
    'rushing_yards_after_contact_avg': 'RUSHING_YARDS_AFTER_CONTACT_AVG',
    'rushing_broken_tackles': 'RUSHING_BROKEN_TACKLES',
    'efficiency': 'EFFICIENCY',
    'percent_attempts_gte_eight_defenders': 'PERCENT_ATTEMPTS_GTE_EIGHT_DEFENDERS',
    'avg_time_to_los': 'AVG_TIME_TO_LOS',
    'expected_rush_yards': 'EXPECTED_RUSH_YARDS',
    'rush_yards_over_expected': 'RUSH_YARDS_OVER_EXPECTED',
    'rush_yards_over_expected_per_att': 'RUSH_YARDS_OVER_EXPECTED_PER_ATT',
    'rush_pct_over_expected': 'RUSH_PCT_OVER_EXPECTED'
}

# Apply renaming
df.rename(columns=column_rename_dict, inplace=True)

# Upload DataFrame to database
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(df, "nfl_rb_weekly_stats")

print("✅ NFL RB weekly stats data uploaded successfully!")

