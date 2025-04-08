from run_NBAModel import run_model
import pandas as pd
import sqlalchemy_interact

features = ["OG", "OG3", "REG", "CF", "FE"]
models = ["LR", "SVM", "GNB", "GB", "DT", "KNN", "MLP", "RF"]

df = pd.DataFrame()

for feature in features:
    for model in models:
        temp_list = run_model(feature, model)
        if feature == "OG" and model == "LR":
            df["GAME_ID"] = temp_list[1]
        df[temp_list[0] + "_HOME_W_PROB"] = temp_list[2]
        df[temp_list[0] + "_AWAY_W_PROB"] = temp_list[3]

sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(df, "nbapredictions")
