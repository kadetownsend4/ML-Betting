"""File that holds two functions for inserting and gathering pandas dataframes to and from the database.

   author = Kade Townsend
"""


import pandas as pd
# import for how the connection is created
from sqlalchemy import create_engine
# import for getting data from .env
import os
from dotenv import load_dotenv

load_dotenv()


# connection credentials are held in the gitignore file for security reasons. This
# set of code gathers connection credentials from a .env file for access.
user = os.environ.get('DB_USER')
print(user)
pw = os.environ.get('DB_PW')
host = os.environ.get('DB_HOST')
port = "5432"
name = os.environ.get('DB_NAME')


def insert_df_to_mysql_sqlalchemy(df, table_name):
    """Function to insert a pandas dataframe as a table into the
       render database with a specific table name

       Parameters:
       df -- dataframe to insert
       table_name -- name of table to be called
    """
    # establishes a connection engine to link with the database
    engine = create_engine(
        f"postgresql://{user}:{pw}@{host}:{port}/{name}")
    # inserts df, this code appends to a table if it has the same name already in database
    # append ensures that the tables created by the flask models are not overridden by df insertion
    df.to_sql(name=table_name, con=engine, if_exists='append', index=False)
    print(f"DataFrame successfully inserted into table '{table_name}'")



def get_df_from_mysql_sqlalchemy(table):
    """Function to gather a table from the render database as
       a pandas dataframe

       Parameters:
       table -- tabke name that is used to specificy which table to collect from database

       Return:
       table as a pandas dataframe
    """
    # establishes a connection engine to link with the database
    engine = create_engine(
        f"postgresql://{user}:{pw}@{host}:{port}/{name}")
    # gets table and transforms into df
    df = pd.read_sql_table(table, engine.connect())
    print("DataFrame successfully gathered")
    return df
