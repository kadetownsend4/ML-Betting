"""Class file to define user within the application.

   author = Kade Townsend
"""

class UserClass: 
    def __init__(self, first_name, last_name, age):
        """Initialization function to define a user
           
           Parameters:
           first_name -- first name of user
           last_name -- last name of user
           age -- age of user
        """
        self.first_name = first_name
        self.last_name = last_name
        self.age = age

    def get_name(self):
        """Function to get name of the current user

           Return:
           first and last name of user
        """
        return self.first_name + " " + self.last_name
    
    def get_age(self):
        """Function to get age of current user

           Return:
           age of user
        """
        return self.age