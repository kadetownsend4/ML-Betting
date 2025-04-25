from Classs.Person import Person

class Player(Person):
    def __init__(self, pos, team, age):
        self.pos = pos
        self.team = team
        self.age = age

    def get_pos(self):
        return self.pos
    
    def get_team(self):
        return self.team
    
    def get_age(self):
        return self.age