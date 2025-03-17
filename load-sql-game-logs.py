import mysql.connector
import pandas as pd
import csv

game_logs = pd.read_csv("GettingData/gameLogs.csv")

#print(game_logs)

csv_filepath = "GettingData/gameLogs.csv"

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Baseball2003!",
    database="BetterPicks"
)

cursor = connection.cursor()

cursor.execute("""CREATE TABLE nbagamelogs (Unnamed int, CITY VARCHAR(255), NICKNAME VARCHAR(255), TEAM_ID int, W int, L int, W_HOME int, 
               L_HOME int, W_ROAD int, L_ROAD int, TEAM_TURNOVERS int, TEAM_REBOUNDS int, GP int, GS int, ACTUAL_MINUTES int,
               ACTUAL_SECONDS int, FG int, FGA int, FG_PCT float, FG3 int, FG3A int, FG3_PCT float, FT int, FTA int, FT_PCT float,
               OFF_REB int, DEF_REB int, TOT_REB int, AST int, PF int, STL int, TOTAL_TURNOVERS int, BLK int, PTS int,
               AVG_REB float, AVG_PTS float, DQ int, OFFENSIVE_EFFICIENCY float, SCORING_MARGIN float, SEASON VARCHAR(255),
               GAME_DATE VARCHAR(255), GAME_ID int, HOME_FLAG int, AWAY_FLAG int, HOME_WIN_PCTG float, AWAY_WIN_PCTG float,
               TOTAL_WIN_PCTG float, ROLLING_SCORING_MARGIN float, ROLLING_OE float, NUM_REST_DAYS float)""")

connection.close()
cursor.close()