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

cursor.execute("DROP TABLE nbagamelogs")

with open(csv_filepath, 'r') as file:
    csv_reader = csv.reader(file)
    header = next(csv_reader)

    create_table_query = f"CREATE TABLE IF NOT EXISTS nbagamelogs ({', '.join([f'{col} VARCHAR(255)' for col in header])})"
    cursor.execute(create_table_query)

    insert_query = f"INSERT INTO your_table ({', '.join(header)}) VALUES ({', '.join(['%s'] * len(header))})"

    for row in csv_reader:
        cursor.execute(insert_query, row)

    connection.commit()

connection.close()
cursor.close()