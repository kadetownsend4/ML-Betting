"""Static file that intialiy loads game logs to the database for use within the application.
   This file only needs to run once.

   author = Kade Townsend
"""

import pandas as pd
import sqlalchemy_interact

# puts csv file of game logs into df
df = pd.read_csv("NBA/GettingData/gameLogs.csv")

df = df.drop("Unnamed: 0", axis=1)

df['NICKNAME'] = df['NICKNAME'].str.lstrip()

# inserts df to database under name "nbagamelogs"
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(df, "nbagamelogs")
