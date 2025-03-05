import pandas as pd
from sklearn.preprocessing import StandardScaler

class ModelClass:
    def __init__(self, feature_set, model_name):
        self.feature_set = feature_set
        self.model_name = model_name
        self.preprocessed_data = pd.DataFrame()

    def get_feature_set(self):
        return self.feature_set
    
    def get_model_name(self):
        return self.model_name
    
    def preprocess_data(self, og_data):
        data = pd.read_csv(og_data)
        data.dropna()
        data["TS_PCT"] = data["PTS"]/(2*(data["FGA"]+(0.475*data["FTA"])))
        data["STL+BLK"] = data["STL"] + data["BLK"]
        data["TOV_PCT"] = data["TOTAL_TURNOVERS"]/(data["FGA"]+(0.475*data["FTA"])+data["AST"]+data["TOTAL_TURNOVERS"])
        data['LAST_GAME_OE'] = data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['OFFENSIVE_EFFICIENCY'].shift(1)
        data['LAST_GAME_HOME_WIN_PCTG'] = data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['HOME_WIN_PCTG'].shift(1)
        data['LAST_GAME_AWAY_WIN_PCTG'] = data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['AWAY_WIN_PCTG'].shift(1)
        data['LAST_GAME_TOTAL_WIN_PCTG'] = data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TOTAL_WIN_PCTG'].shift(1)
        data['LAST_GAME_ROLLING_SCORING_MARGIN'] = data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['ROLLING_SCORING_MARGIN'].shift(1)
        data['LAST_GAME_ROLLING_OE'] = data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['ROLLING_OE'].shift(1)
        data['LAST_3_GAME_AVG_OE'] = (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['OFFENSIVE_EFFICIENCY'].shift(1) + data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['OFFENSIVE_EFFICIENCY'].shift(2) + data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['OFFENSIVE_EFFICIENCY'].shift(3))/3
        data['LAST_3_GAME_AVG_HOME_WIN_PCTG'] = (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['HOME_WIN_PCTG'].shift(1) + data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['HOME_WIN_PCTG'].shift(2) + data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['HOME_WIN_PCTG'].shift(3))/3
        data['LAST_3_GAME_AVG_AWAY_WIN_PCTG'] = (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['AWAY_WIN_PCTG'].shift(1) + data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['AWAY_WIN_PCTG'].shift(2) + data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['AWAY_WIN_PCTG'].shift(3))/3
        data['LAST_3_GAME_AVG_TOTAL_WIN_PCTG'] = (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TOTAL_WIN_PCTG'].shift(1) + data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TOTAL_WIN_PCTG'].shift(2) + data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TOTAL_WIN_PCTG'].shift(3))/3
        data['LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN'] = (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['ROLLING_SCORING_MARGIN'].shift(1) + data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['ROLLING_SCORING_MARGIN'].shift(2) + data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['ROLLING_SCORING_MARGIN'].shift(3))/3
        data['LAST_3_GAME_AVG_ROLLING_OE'] = (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['ROLLING_OE'].shift(1) + data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['ROLLING_OE'].shift(2) + data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['ROLLING_OE'].shift(3))/3
        data["LAST_3_GAME_AVG_TS_PCT"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TS_PCT'].shift(1)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TS_PCT'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TS_PCT'].shift(3)))/3
        data["LAST_3_GAME_AVG_FG3_PCT"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['FG3_PCT'].shift(1)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['FG3_PCT'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['FG3_PCT'].shift(3)))/3
        data["LAST_3_GAME_AVG_TOT_REB"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TOT_REB'].shift(1)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TOT_REB'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TOT_REB'].shift(3)))/3
        data["LAST_3_GAME_AVG_STL+BLK"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['STL+BLK'].shift(1)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['STL+BLK'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['STL+BLK'].shift(3)))/3
        data["LAST_3_GAME_AVG_TOV_PCT"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TOV_PCT'].shift(1)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TOV_PCT'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TOV_PCT'].shift(3)))/3
        data["LAST_3_GAME_AVG_PTS"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['PTS'].shift(1)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['PTS'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['PTS'].shift(3)))/3
        data["LAST_3_GAME_AVG_FG_PCT"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['FG_PCT'].shift(1)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['FG_PCT'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['FG_PCT'].shift(3)))/3
        data["LAST_3_GAME_AVG_FT_PCT"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['FT_PCT'].shift(1)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['FT_PCT'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['FT_PCT'].shift(3)))/3
        data["LAST_3_GAME_AVG_AST"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['AST'].shift(1)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['AST'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['AST'].shift(3)))/3
        data["LAST_3_GAME_AVG_STL"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['STL'].shift(1)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['STL'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['STL'].shift(3)))/3
        data["LAST_3_GAME_AVG_TOTAL_TURNOVERS"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TOTAL_TURNOVERS'].shift(1)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TOTAL_TURNOVERS'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['TOTAL_TURNOVERS'].shift(3)))/3
        data["LAST_3_GAME_AVG_BLK"] = ((data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['BLK'].shift(1)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['BLK'].shift(2)) + (data.sort_values('GAME_DATE').groupby(['TEAM_ID','SEASON'])['BLK'].shift(3)))/3
        gameDF = data
        gamedf = data
        homeTeamFrame = gameDF[gameDF['CITY'] != 'OPPONENTS']
        awayTeamFrame = gamedf[gamedf['CITY'] == 'OPPONENTS']
        if self.feature_set == "REG":
            homeTeamFrame = homeTeamFrame[['LAST_3_GAME_AVG_OE','LAST_3_GAME_AVG_HOME_WIN_PCTG','NUM_REST_DAYS','LAST_3_GAME_AVG_AWAY_WIN_PCTG','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','W','TEAM_ID','GAME_ID','GAME_DATE','SEASON',"LAST_3_GAME_AVG_FG_PCT","LAST_3_GAME_AVG_FG3_PCT","LAST_3_GAME_AVG_FT_PCT","LAST_3_GAME_AVG_ROLLING_OE","LAST_3_GAME_AVG_TOT_REB","LAST_3_GAME_AVG_AST","LAST_3_GAME_AVG_STL","LAST_3_GAME_AVG_TOTAL_TURNOVERS","LAST_3_GAME_AVG_BLK","LAST_3_GAME_AVG_PTS"]]
            awayTeamFrame = awayTeamFrame[['LAST_3_GAME_AVG_OE','LAST_3_GAME_AVG_HOME_WIN_PCTG','NUM_REST_DAYS','LAST_3_GAME_AVG_AWAY_WIN_PCTG','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','TEAM_ID','GAME_ID','GAME_DATE','SEASON',"LAST_3_GAME_AVG_FG_PCT","LAST_3_GAME_AVG_FG3_PCT","LAST_3_GAME_AVG_FT_PCT","LAST_3_GAME_AVG_ROLLING_OE","LAST_3_GAME_AVG_TOT_REB","LAST_3_GAME_AVG_AST","LAST_3_GAME_AVG_STL","LAST_3_GAME_AVG_TOTAL_TURNOVERS","LAST_3_GAME_AVG_BLK","LAST_3_GAME_AVG_PTS"]]
        elif self.feature_set == "CF":
            homeTeamFrame = homeTeamFrame[['LAST_3_GAME_AVG_OE','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','W','TEAM_ID','GAME_ID','GAME_DATE','SEASON',"LAST_3_GAME_AVG_TS_PCT","LAST_3_GAME_AVG_FG3_PCT","LAST_3_GAME_AVG_PTS"]]
            awayTeamFrame = awayTeamFrame[['LAST_3_GAME_AVG_OE','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','TEAM_ID','GAME_ID','GAME_DATE','SEASON',"LAST_3_GAME_AVG_TS_PCT","LAST_3_GAME_AVG_TOTAL_TURNOVERS","LAST_3_GAME_AVG_PTS"]]
        elif self.feature_set == "FE":
            homeTeamFrame = homeTeamFrame[['LAST_3_GAME_AVG_OE','NUM_REST_DAYS','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','W','TEAM_ID','GAME_ID','GAME_DATE','SEASON',"LAST_3_GAME_AVG_TS_PCT","LAST_3_GAME_AVG_FG3_PCT","LAST_3_GAME_AVG_TOT_REB","LAST_3_GAME_AVG_STL+BLK","LAST_3_GAME_AVG_TOV_PCT","LAST_3_GAME_AVG_PTS"]]
            awayTeamFrame = awayTeamFrame[['LAST_3_GAME_AVG_OE','NUM_REST_DAYS','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','TEAM_ID','GAME_ID','GAME_DATE','SEASON',"LAST_3_GAME_AVG_TS_PCT","LAST_3_GAME_AVG_FG3_PCT","LAST_3_GAME_AVG_TOT_REB","LAST_3_GAME_AVG_STL+BLK","LAST_3_GAME_AVG_TOV_PCT","LAST_3_GAME_AVG_PTS"]]
        elif self.feature_set == "OG":
            homeTeamFrame = homeTeamFrame[['LAST_GAME_OE','LAST_GAME_HOME_WIN_PCTG','NUM_REST_DAYS','LAST_GAME_AWAY_WIN_PCTG','LAST_GAME_TOTAL_WIN_PCTG','LAST_GAME_ROLLING_SCORING_MARGIN','LAST_GAME_ROLLING_OE','W','TEAM_ID','GAME_ID','GAME_DATE','SEASON']]
            awayTeamFrame = awayTeamFrame[['LAST_GAME_OE','LAST_GAME_HOME_WIN_PCTG','NUM_REST_DAYS','LAST_GAME_AWAY_WIN_PCTG','LAST_GAME_TOTAL_WIN_PCTG','LAST_GAME_ROLLING_SCORING_MARGIN','LAST_GAME_ROLLING_OE','TEAM_ID','GAME_ID','GAME_DATE','SEASON']]
        elif self.feature_set == "OG3":
            homeTeamFrame = homeTeamFrame[['LAST_3_GAME_AVG_OE','LAST_3_GAME_AVG_HOME_WIN_PCTG','NUM_REST_DAYS','LAST_3_GAME_AVG_AWAY_WIN_PCTG','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','W','TEAM_ID','GAME_ID','GAME_DATE','SEASON']]
            awayTeamFrame = awayTeamFrame[['LAST_3_GAME_AVG_OE','LAST_3_GAME_AVG_HOME_WIN_PCTG','NUM_REST_DAYS','LAST_3_GAME_AVG_AWAY_WIN_PCTG','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','TEAM_ID','GAME_ID','GAME_DATE','SEASON']]
        colRenameDict = {}
        for col in homeTeamFrame.columns:
            if (col != 'GAME_ID') & (col != 'SEASON') :
                colRenameDict[col] = 'HOME_' + col 
        homeTeamFrame.rename(columns=colRenameDict,inplace=True)
        colRenameDict = {}
        for col in awayTeamFrame.columns:
            if (col != 'GAME_ID') & (col != 'SEASON'):
                colRenameDict[col] = 'AWAY_' + col 
        awayTeamFrame.rename(columns=colRenameDict,inplace=True)
        data = pd.merge(homeTeamFrame, awayTeamFrame, how="inner", on=["GAME_ID","SEASON"]).drop(['GAME_ID','AWAY_TEAM_ID','HOME_TEAM_ID'],axis=1)
        self.preprocessed_data = data

    def run(self, start_date, end_date):
        df = self.preprocessed_data
        df = df.drop(["SEASON", "Unnamed: 0"], axis = 1)
        excluded_col = df[['HOME_W','GAME_DATE']]
        df_to_scale = df.drop(['HOME_W','GAME_DATE'], axis=1)
        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(df_to_scale)
        scaled_df = pd.DataFrame(scaled_data, columns=df_to_scale.columns)
        final_df = pd.concat([scaled_df, excluded_col], axis=1)
        
