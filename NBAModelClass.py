import pandas as pd


class NBAModelClass:
    

    def _init_(self, feature_set, model_name):
        self.feature_set = feature_set
        self.model_name = model_name

    def get_feature_set(self):
        return self.feature_set
    
    def get_model_name(self):
        return self.model_name
    
    def preprocess_data(self, og_data):
        data = pd.read_csv(og_data)
        data["TS_PCT"] = data["PTS"]/(2*(data["FGA"]+(0.475*data["FTA"])))
        data["STL+BLK"] = data["STL"] + data["BLK"]
        data["TOV_PCT"] = data["TOTAL_TURNOVERS"]/(data["FGA"]+(0.475*data["FTA"])+data["AST"]+data["TOTAL_TURNOVERS"])
        