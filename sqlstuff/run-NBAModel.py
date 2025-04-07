import sql_NBAModel
import sqlalchemy_interact
import pandas as pd


def run_model(feature, model):
    temp = sql_NBAModel.NBAModel(feature, model)
    temp.preprocess_data("nbagamelogs")
    temp.run("2022-10-18", "2023-04-09", "2020-12-22", "2022-04-10")
    temp.calc_metrics()
    temp.format_predictions()
    df = temp.get_database_df()
    date = df["GAME_ID"].tolist()
    home = df["HOME_W_PROB"].tolist()
    away = df["AWAY_W_PROB"].tolist()
    name = feature + "_" + model
    return [name, date, home, away]


print(run_model("OG", "LR"))
