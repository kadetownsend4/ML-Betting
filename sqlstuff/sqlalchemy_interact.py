import pandas as pd
from sqlalchemy import create_engine

def insert_df_to_mysql_sqlalchemy(df, table_name):
    engine = create_engine(f"mysql+mysqlconnector://{'root'}:{'Baseball2003!'}@{'localhost'}:{'3306'}/{'BetterPicks'}")
    df.to_sql(name=table_name, con=engine, if_exists='replace', index=False)
    print(f"DataFrame successfully inserted into table '{table_name}'")

def get_df_from_mysql_sqlalchemy(sql):
    engine = create_engine(f"mysql+mysqlconnector://{'root'}:{'Baseball2003!'}@{'localhost'}:{'3306'}/{'BetterPicks'}")
    df = pd.from_sql(sql, engine)
    print("DataFrame successfully gathered")
    return df