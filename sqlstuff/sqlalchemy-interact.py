import pandas as pd
from sqlalchemy import create_engine

def insert_df_to_mysql_sqlalchemy(df, table_name, db_config):
    engine = create_engine(f"mysql+mysqlconnector://{'root'}:{'Baseball2003!'}@{'localhost'}:{'3306'}/{'BetterPicks'}")
    df.to_sql(name=table_name, con=engine, if_exists='replace', index=False)
    print(f"DataFrame successfully inserted into table '{table_name}'")

#df = pd.read_csv("GettingData/gameLogs.csv")

#db_config = {
    #'user': 'root',
    #'password': 'Baseball2003!',
    #'host': 'localhost',
    #'port': '3306',
    #'database': 'BetterPicks'
#}

#insert_df_to_mysql_sqlalchemy(df, 'nbagamelogs', db_config)