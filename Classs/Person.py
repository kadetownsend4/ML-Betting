"""Class file to define person within the application.

   author = Kade Townsend
"""

class Person: 
    def __init__(self, first_name, last_name, age):
        """Initialization function to define a person
           
           Parameters:
           first_name -- first name of person
           last_name -- last name of person
           age -- age of person
        """
        self.first_name = first_name
        self.last_name = last_name
        self.age = age

    def get_name(self):
        """Function to get name of the current person

           Return:
           first and last name of person
        """
        return self.first_name + " " + self.last_name
    
    def get_age(self):
        """Function to get age of current person

           Return:
           age of person
        """
        return self.age