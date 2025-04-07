import sql_NBAModel
import sqlalchemy_interact

def run_model(feature, model):
    temp = sql_NBAModel.NBAModel(feature, model)
    temp.preprocess_data(sqlalchemy_interact.get_df_from_mysql_sqlalchemy("nbagamelogs"))
    temp.run("2020-12-22", "2022-04-10", "2022-10-18", "2023-04-09")
    temp.calc_metrics()
    temp.format_predictions()
    df = temp.get_database_df
    