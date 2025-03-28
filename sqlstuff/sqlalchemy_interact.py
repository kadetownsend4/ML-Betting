import pandas as pd
from sqlalchemy import create_engine
import os

user = os.environ.get('DB_USER')
pw = os.environ.get('DB_PW')
host = os.environ.get('DB_HOST')
port = 5432
name = os.environ.get('DB_NAME')


def insert_df_to_mysql_sqlalchemy(df, table_name):
    engine = create_engine(
        f"postgresql://{user}:{pw}@{host}:{port}/{name}")
    df.to_sql(name=table_name, con=engine, if_exists='replace', index=False)
    print(f"DataFrame successfully inserted into table '{table_name}'")


def get_df_from_mysql_sqlalchemy(sql):
    engine = create_engine(
        f"postgresql://{user}:{pw}@{host}:{port}/{name}")
    df = pd.read_sql(sql, engine)
    #print("DataFrame successfully gathered")
    return df
