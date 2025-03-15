import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Baseball2003!",
    database="BetterPicks"
)

cursor = connection.cursor()