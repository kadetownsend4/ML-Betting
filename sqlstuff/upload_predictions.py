"""File to upload predictions for every set of feature and model within a df to the database.
   These predictions hold probabilites for both home and away teams of each matchup or game.

   author = Kade Townsend
"""

from run_NBAModel import run_model
import pandas as pd
import sqlalchemy_interact

# define all feature and model names
features = ["OG", "OG3", "REG", "CF", "FE"]
models = ["LR", "SVM", "GNB", "GB", "DT", "KNN", "MLP", "RF"]

# create an empty df
df = pd.DataFrame()

# go through each feature name
for feature in features:
    # go through each model name
    for model in models:
        # find list from run_model of probabilities and game ids for the combination
        temp_list = run_model(feature, model)
        # only need game ids once in the df
        if feature == "OG" and model == "LR":
            df["GAME_ID"] = temp_list[1]
        # add the home and away identifier to the probabilities from the list and add the list as a column
        df[temp_list[0] + "_HOME_W_PROB"] = temp_list[2]
        df[temp_list[0] + "_AWAY_W_PROB"] = temp_list[3]

# upload the df with game ids and probabilites for each model and feature combination to the database
sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(df, "nbapredictions")
