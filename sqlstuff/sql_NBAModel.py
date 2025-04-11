"""Class file to define machine learning models for NBA data based on certain model names and feature
   sets.

   author = Kade Townsend
"""

# import required packages for code
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn import svm
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn import ensemble
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.ensemble import RandomForestClassifier
import sklearn.metrics
import sqlalchemy_interact

class NBAModel:
    def __init__(self, feature_set, model_name):
        """Initialization function to create ML models based on different feature sets and
           models. Defines multiple variables for use by the class and its functions. 

           Parameters:
           feature_set -- name of the feature set to use
           model_name -- name of the model to use
        """
        self.feature_set = feature_set
        self.model_name = model_name
        self.preprocessed_data = pd.DataFrame()
        self.pred = []
        self.pred_proba = []
        self.y_test = pd.DataFrame()
        self.test = pd.DataFrame()
        self.database_df = pd.DataFrame()
        self.accuracy = 0.0
        self.confusion_matrix = []
        self.recall = 0.0
        self.specificity = 0.0
        self.precision = 0.0
        self.f1 = 0.0

    def get_feature_set(self):
        """Returns the name of the feature set.

           Return:
           String name of feature set
        """
        return self.feature_set
    
    def get_model_name(self):
        """Returns the name of the model.

           Return:
           String name of model
        """
        return self.model_name
    
    def get_database_df(self):
        """Returns a dataframe that can be transfered to the database. Has necessary predictions from model

           Return:
           database dataframe
        """
        return self.database_df
    
    def get_accuracy(self):
        """Returns an accuracy score gathered from running the model.

           Return:
           accuracy score for current test frame
        """
        return self.accuracy
    
    def get_confusion_matrix(self):
        """Returns a confusion matrix from running model

           Return:
           confusion matrix for current test frame
        """
        return self.confusion_matrix
    
    def get_recall(self):
        """Returns a recall score from running model
        
           Return:
           recall score for current test frame
        """
        return self.recall
    
    def get_specificity(self):
        """Returns a specificity score from running model
        
           Return:
           specifiicty score for current test frame
        """
        return self.specificity
    
    def get_precision(self):
        """Returns a precision score from running model
        
           Return:
           precision score for current test frame
        """
        return self.precision
    
    def get_f1(self):
        """Returns a f1 score from running model
        
           Return:
           f1 score for current test frame
        """
        return self.f1
    
    def preprocess_data(self, table):
        """Function to preprocess the data that is passed in as a parameter. For preprocessing,
           the features are all determined and calculated. It's a mixture of past game data and
           past 3 game data. The features are then divided and dropped based on which set they
           belong too. These features are then combined based on the away and home team to
           a dataframe containing both. This dataframe is then passed back to a global variable.

           Parameters:
           sql -- sql query code to get stats from database for model running
        """
        data = sqlalchemy_interact.get_df_from_mysql_sqlalchemy(table)
        data.dropna()
        # true shooting percentage
        data["TS_PCT"] = data["PTS"]/(2*(data["FGA"]+(0.475*data["FTA"])))
        # steals + blocks
        data["STL+BLK"] = data["STL"] + data["BLK"]
        # weighted turnover percentage
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
        data = data.dropna()
        gameDF = data
        gamedf = data
        # split data into home and away
        homeTeamFrame = gameDF[gameDF['CITY'] != 'OPPONENTS']
        awayTeamFrame = gamedf[gamedf['CITY'] == 'OPPONENTS']
        # determine which feature set to use
        if self.feature_set == "REG":
            homeTeamFrame = homeTeamFrame[['LAST_3_GAME_AVG_OE','LAST_3_GAME_AVG_HOME_WIN_PCTG','NUM_REST_DAYS','LAST_3_GAME_AVG_AWAY_WIN_PCTG','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','W','TEAM_ID','GAME_ID','GAME_DATE','SEASON',"LAST_3_GAME_AVG_FG_PCT","LAST_3_GAME_AVG_FG3_PCT","LAST_3_GAME_AVG_FT_PCT","LAST_3_GAME_AVG_ROLLING_OE","LAST_3_GAME_AVG_TOT_REB","LAST_3_GAME_AVG_AST","LAST_3_GAME_AVG_STL","LAST_3_GAME_AVG_TOTAL_TURNOVERS","LAST_3_GAME_AVG_BLK","LAST_3_GAME_AVG_PTS"]]
            awayTeamFrame = awayTeamFrame[['LAST_3_GAME_AVG_OE','LAST_3_GAME_AVG_HOME_WIN_PCTG','NUM_REST_DAYS','LAST_3_GAME_AVG_AWAY_WIN_PCTG','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','TEAM_ID','GAME_ID','SEASON',"LAST_3_GAME_AVG_FG_PCT","LAST_3_GAME_AVG_FG3_PCT","LAST_3_GAME_AVG_FT_PCT","LAST_3_GAME_AVG_ROLLING_OE","LAST_3_GAME_AVG_TOT_REB","LAST_3_GAME_AVG_AST","LAST_3_GAME_AVG_STL","LAST_3_GAME_AVG_TOTAL_TURNOVERS","LAST_3_GAME_AVG_BLK","LAST_3_GAME_AVG_PTS"]]
        elif self.feature_set == "CF":
            homeTeamFrame = homeTeamFrame[['LAST_3_GAME_AVG_OE','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','W','TEAM_ID','GAME_ID','GAME_DATE','SEASON',"LAST_3_GAME_AVG_TS_PCT","LAST_3_GAME_AVG_FG3_PCT","LAST_3_GAME_AVG_PTS"]]
            awayTeamFrame = awayTeamFrame[['LAST_3_GAME_AVG_OE','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','TEAM_ID','GAME_ID','SEASON',"LAST_3_GAME_AVG_TS_PCT","LAST_3_GAME_AVG_TOTAL_TURNOVERS","LAST_3_GAME_AVG_PTS"]]
        elif self.feature_set == "FE":
            homeTeamFrame = homeTeamFrame[['LAST_3_GAME_AVG_OE','NUM_REST_DAYS','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','W','TEAM_ID','GAME_ID','GAME_DATE','SEASON',"LAST_3_GAME_AVG_TS_PCT","LAST_3_GAME_AVG_FG3_PCT","LAST_3_GAME_AVG_TOT_REB","LAST_3_GAME_AVG_STL+BLK","LAST_3_GAME_AVG_TOV_PCT","LAST_3_GAME_AVG_PTS"]]
            awayTeamFrame = awayTeamFrame[['LAST_3_GAME_AVG_OE','NUM_REST_DAYS','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','TEAM_ID','GAME_ID','SEASON',"LAST_3_GAME_AVG_TS_PCT","LAST_3_GAME_AVG_FG3_PCT","LAST_3_GAME_AVG_TOT_REB","LAST_3_GAME_AVG_STL+BLK","LAST_3_GAME_AVG_TOV_PCT","LAST_3_GAME_AVG_PTS"]]
        elif self.feature_set == "OG":
            homeTeamFrame = homeTeamFrame[['LAST_GAME_OE','LAST_GAME_HOME_WIN_PCTG','NUM_REST_DAYS','LAST_GAME_AWAY_WIN_PCTG','LAST_GAME_TOTAL_WIN_PCTG','LAST_GAME_ROLLING_SCORING_MARGIN','LAST_GAME_ROLLING_OE','W','TEAM_ID','GAME_ID','GAME_DATE','SEASON']]
            awayTeamFrame = awayTeamFrame[['LAST_GAME_OE','LAST_GAME_HOME_WIN_PCTG','NUM_REST_DAYS','LAST_GAME_AWAY_WIN_PCTG','LAST_GAME_TOTAL_WIN_PCTG','LAST_GAME_ROLLING_SCORING_MARGIN','LAST_GAME_ROLLING_OE','TEAM_ID','GAME_ID','SEASON']]
        elif self.feature_set == "OG3":
            homeTeamFrame = homeTeamFrame[['LAST_3_GAME_AVG_OE','LAST_3_GAME_AVG_HOME_WIN_PCTG','NUM_REST_DAYS','LAST_3_GAME_AVG_AWAY_WIN_PCTG','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','W','TEAM_ID','GAME_ID','GAME_DATE','SEASON']]
            awayTeamFrame = awayTeamFrame[['LAST_3_GAME_AVG_OE','LAST_3_GAME_AVG_HOME_WIN_PCTG','NUM_REST_DAYS','LAST_3_GAME_AVG_AWAY_WIN_PCTG','LAST_3_GAME_AVG_TOTAL_WIN_PCTG','LAST_3_GAME_AVG_ROLLING_SCORING_MARGIN','LAST_3_GAME_AVG_ROLLING_OE','TEAM_ID','GAME_ID','SEASON']]
        else:
            # feature set not found
            raise ValueError
        colRenameDict = {}
        # add HOME in front of home stats
        for col in homeTeamFrame.columns:
            if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
                colRenameDict[col] = 'HOME_' + col 
        homeTeamFrame.rename(columns=colRenameDict,inplace=True)
        colRenameDict = {}
        # add AWAY in front of away stats
        for col in awayTeamFrame.columns:
            if (col != 'GAME_ID') & (col != 'SEASON') & (col != 'GAME_DATE'):
                colRenameDict[col] = 'AWAY_' + col 
        awayTeamFrame.rename(columns=colRenameDict,inplace=True)
        # merge home and away features together
        data = pd.merge(homeTeamFrame, awayTeamFrame, how="inner", on=["GAME_ID","SEASON"]).drop(['AWAY_TEAM_ID','HOME_TEAM_ID'],axis=1)
        self.preprocessed_data = data

    def run(self, start_date_test, end_date_test, start_date_train, end_date_train):
        """Runs a model on a specific set of data. The start and end dates based on games dates
           will split the data into train and test dataframes that will be used within the models. 
           The model names help determine which model to use in the actual training. The dataframes
           from testing, predicting, and probability predicting are passed to global variables of
           the class.
           
           Parameters:
           start_date_test -- start date for gathering games for test set
           end_date_test -- end date for gathering games for test set
           start_date_train -- start date for gathering games for train set
           end_date_train -- end date for gathering games for train set
        """
        df = self.preprocessed_data
        # columns to not scale because they are identifiers not quantitative
        excluded_col = df[['HOME_W','GAME_DATE','GAME_ID','SEASON']]
        df_to_scale = df.drop(['HOME_W','GAME_DATE','GAME_ID','SEASON'], axis=1)
        scaler = StandardScaler()
        # scale features for better fitting
        scaled_data = scaler.fit_transform(df_to_scale)
        scaled_df = pd.DataFrame(scaled_data, columns=df_to_scale.columns)
        # add excluded columns back in
        final_df = pd.concat([scaled_df, excluded_col], axis=1)
        # split test and train based on dates
        train = final_df[(final_df['GAME_DATE'] >= start_date_train) & (final_df['GAME_DATE'] <= end_date_train)]
        test = final_df[(final_df['GAME_DATE'] >= start_date_test) & (final_df['GAME_DATE'] <= end_date_test)]
        self.test = test
        # find x and y splits
        x_train = train.drop(["HOME_W","GAME_DATE","GAME_ID","SEASON"], axis=1)
        y_train = train["HOME_W"]
        x_test = test.drop(["HOME_W","GAME_DATE","GAME_ID","SEASON"], axis=1)
        self.y_test = test["HOME_W"]
        # compare model name to model applied
        if self.model_name == "LR":
            model = LogisticRegression()
        elif self.model_name == "SVM":
            model = svm.SVC(kernel='linear',probability=True)
        elif self.model_name == "GNB":
            model = GaussianNB()
        elif self.model_name == "GB":
            model = ensemble.GradientBoostingClassifier()
        elif self.model_name == "DT":
            model = DecisionTreeClassifier(criterion="entropy")
        elif self.model_name == "KNN":
            model = KNeighborsClassifier()
        elif self.model_name == "MLP":
            model = MLPClassifier()
        elif self.model_name == "RF":
            model = RandomForestClassifier()
        else:
            # model not found
            raise ValueError
        # fit and predict
        model.fit(x_train, y_train)
        self.pred = model.predict(x_test)
        self.pred_proba = model.predict_proba(x_test)

    def calc_metrics(self):
        """Function to calculate the necessary metrics for understanding how well
           the model performed on the test set. These metrics are then passed back
           into global variables for use by the class system as a whole.
        """
        self.confusion_matrix = sklearn.metrics.confusion_matrix(self.y_test, self.pred)
        self.accuracy = sklearn.metrics.accuracy_score(self.y_test, self.pred)
        self.recall = sklearn.metrics.recall_score(self.y_test, self.pred)
        self.specificity = sklearn.metrics.recall_score(self.y_test, self.pred, pos_label=0)
        self.precision = sklearn.metrics.precision_score(self.y_test, self.pred)
        self.f1 = sklearn.metrics.f1_score(self.y_test, self.pred)

    def format_predictions(self):
        """Function to format the predictions and actual wins into a dataframe that
           can identify games and their results / guesses by the ids, seasons, and dates.
           This dataframe can be passed into the database to be use for relational gathering
           of information.
        """
        # concat diff dataframes together in correct order to get organized dataframe with all information
        df = self.test[['SEASON','GAME_ID','GAME_DATE','HOME_W']]
        frames = [df, pd.DataFrame(self.pred, index=df.index), pd.DataFrame(self.pred_proba, index=df.index)]
        result = pd.concat(frames, axis=1, ignore_index=True)
        result.rename(columns={0: 'SEASON', 1: 'GAME_ID', 2: 'GAME_DATE', 3: 'HOME_W', 4: 'HOME_W_PRED', 5: 'AWAY_W_PROB', 6: 'HOME_W_PROB'}, inplace=True)
        # store databased back into the class
        self.database_df = result