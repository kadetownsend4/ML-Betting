import pandas as pd
import sqlalchemy_interact

df = pd.read_csv("GettingData/gameLogs.csv")

sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(df, "NBAgamelogs")
