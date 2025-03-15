"""Class file to define user of the application.
  
   author = Kade Townsend
"""

# import packages required for code
from Person import Person
import pandas as pd

class User(Person):
    def __init__(self, first_name, last_name, age, username, password):
        """Initialization function to create a user for the application. 
        
            Parameters:
            first_name -- first name of user
            last_name -- last name of user
            age -- age of user
            username -- username of user
            password -- password of user
        """
        # call person class and initialize it for use within user
        super().__init__(first_name, last_name, age)
        self.username = username
        self.password = password
        self.history = {}

    def get_username(self):
        """Function to get username of the current user

           Return:
           username of user
        """
        return self.username
    
    def change_password(self, new_pw):
        """Function to change password of current user

           Parameters:
           new_pw -- new password to update password to
        """
        self.password = new_pw

    def login(self, un, pw):
        """Function to tell if user is able able to login

           Parameters:
           un -- username that user has entered on login portal
           pw -- password that user has entered on login portal

           Return:
           True or False based on if user was able to login to account
        """
        if (self.username == un and self.password == pw):
            print("login successful")
            return True
        else:
            return False
        
    def get_history(self):
        """Fuction to return dictionary containing betting history of current user

           Return:
           dictionary containing betting history of uzer within application
        """
        return self.history
    
    def add_bet(self, bet, val):
        """Function to add a bet to the betting history of a user

           Parameters:
           bet -- bet to reference
           val -- val to add to a bet
        """
        self.history[bet] = val
