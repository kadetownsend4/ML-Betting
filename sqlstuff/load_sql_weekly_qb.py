"""
    Static file that loads NFL quarterback weekly stats data to the database for use within the application.
    This file only needs to run once.

    author = Timothy Berlanga
 
    I used ChatGPT for help generating the script to upload my data based on the csv file and my other upload scripts. 
    I typically had to edit the rows and path but it gave me a good starting point. 

    Chat Link: https://chatgpt.com/share/67fae08f-148c-800f-bbeb-79064e423c39
"""

import pandas as pd
# Handles database upload
import sqlalchemy_interact  

# Load QB weekly stats data from CSV file
df = pd.read_csv("NFL/weekly_nfl_stats_season/merge_df.csv")

# Clean/strip string fields
string_cols = df.select_dtypes(include='object').columns
df[string_cols] = df[string_cols].apply(lambda x: x.str.strip())

# Rename columns 
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
    'completions': 'COMPLETIONS',
    'attempts': 'ATTEMPTS',
    'passing_yards': 'PASSING_YARDS',
    'passing_tds': 'PASSING_TDS',
    'interceptions': 'INTERCEPTIONS',
    'sacks': 'SACKS',
    'sack_yards': 'SACK_YARDS',
    'sack_fumbles': 'SACK_FUMBLES',
    'sack_fumbles_lost': 'SACK_FUMBLES_LOST',
    'passing_air_yards': 'PASSING_AIR_YARDS',
    'passing_yards_after_catch': 'PASSING_YARDS_AFTER_CATCH',
    'passing_first_downs': 'PASSING_FIRST_DOWNS',
    'passing_epa': 'PASSING_EPA',
    'passing_2pt_conversions': 'PASSING_2PT_CONVERSIONS',
    'pacr': 'PACR',
    'dakota': 'DAKOTA',
    'carries': 'CARRIES',
    'rushing_yards': 'RUSHING_YARDS',
    'rushing_tds': 'RUSHING_TDS',
    'rushing_fumbles': 'RUSHING_FUMBLES',
    'rushing_fumbles_lost': 'RUSHING_FUMBLES_LOST',
    'rushing_first_downs': 'RUSHING_FIRST_DOWNS',
    'rushing_epa': 'RUSHING_EPA',
    'special_teams_tds': 'SPECIAL_TEAMS_TDS',
    'fantasy_points': 'FANTASY_POINTS',
    'fantasy_points_ppr': 'FANTASY_POINTS_PPR',
    'passing_drops': 'PASSING_DROPS',
    'passing_drop_pct': 'PASSING_DROP_PCT',
    'passing_bad_throws': 'PASSING_BAD_THROWS',
    'passing_bad_throw_pct': 'PASSING_BAD_THROW_PCT',
    'times_sacked': 'TIMES_SACKED',
    'times_blitzed': 'TIMES_BLITZED',
    'times_hurried': 'TIMES_HURRIED',
    'times_hit': 'TIMES_HIT',
    'times_pressured': 'TIMES_PRESSURED',
    'times_pressured_pct': 'TIMES_PRESSURED_PCT',
    'rushing_yards_before_contact': 'RUSHING_YARDS_BEFORE_CONTACT',
    'rushing_yards_before_contact_avg': 'RUSHING_YARDS_BEFORE_CONTACT_AVG',
    'rushing_yards_after_contact': 'RUSHING_YARDS_AFTER_CONTACT',
    'rushing_yards_after_contact_avg': 'RUSHING_YARDS_AFTER_CONTACT_AVG',
    'rushing_broken_tackles': 'RUSHING_BROKEN_TACKLES',
    'offense_snaps': 'OFFENSE_SNAPS',
    'offense_pct': 'OFFENSE_PCT',
    'player_position': 'PLAYER_POSITION',
    'avg_time_to_throw': 'AVG_TIME_TO_THROW',
    'avg_completed_air_yards': 'AVG_COMPLETED_AIR_YARDS',
    'avg_intended_air_yards': 'AVG_INTENDED_AIR_YARDS',
    'avg_air_yards_differential': 'AVG_AIR_YARDS_DIFFERENTIAL',
    'aggressiveness': 'AGGRESSIVENESS',
    'max_completed_air_distance': 'MAX_COMPLETED_AIR_DISTANCE',
    'avg_air_yards_to_sticks': 'AVG_AIR_YARDS_TO_STICKS',
    'passer_rating': 'PASSER_RATING',
    'completion_percentage': 'COMPLETION_PERCENTAGE',
    'expected_completion_percentage': 'EXPECTED_COMPLETION_PERCENTAGE',
    'completion_percentage_above_expectation': 'COMPLETION_PERCENTAGE_ABOVE_EXPECTATION',
    'avg_air_distance': 'AVG_AIR_DISTANCE',
    'max_air_distance': 'MAX_AIR_DISTANCE'
}

# Apply the renaming
df.rename(columns=column_rename_dict, inplace=True)

# Insert the cleaned and renamed DataFrame into the database under the "nfl_qb_weekly_stats" table
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(df, "nfl_qb_weekly_stats")

print("NFL quarterback weekly stats data uploaded successfully!")
