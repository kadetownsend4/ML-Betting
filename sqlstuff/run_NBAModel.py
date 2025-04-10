"""Python file that holds a function to run sets of features and models within
   the NBAModel class. This allows for a set date of testing to be determined
   for which predictions will be used. It then returns a list with the ids and prediction
   probabilities for every game within the testing set for the feature and model
   combination. 

   author = Kade Townsend
"""

import sql_NBAModel
import pandas as pd


def run_model(feature, model):
    """Function to run the NBAModel class with an object
       that has a set model name and feature set. 

       Parameters:
       feature -- abbreviation of feature set name (eg. OG, REG, ...)
       model -- abbreviation of model name (eg. LR, MLP, ...)

       Return:
       list of feature and model names as a combination with game ids and probabilities
    """
    # created NBAModel object
    temp = sql_NBAModel.NBAModel(feature, model)
    # preprocess data such as scaling and dropping NA values
    temp.preprocess_data("nbagamelogs")
    # run the model on the specific testing and training sets
    temp.run("2022-10-18", "2023-04-09", "2020-12-22", "2022-04-10")
    # determine metrics for the model
    temp.calc_metrics()
    # format the predictions and probabilites into an internal df
    temp.format_predictions()
    # get the formatted df
    df = temp.get_database_df()
    # specify which columns to use for the list
    id = df["GAME_ID"].tolist()
    home = df["HOME_W_PROB"].tolist()
    away = df["AWAY_W_PROB"].tolist()
    # combine feature and model name into a string for identification
    name = feature + "_" + model
    # return list
    return [name, id, home, away]
