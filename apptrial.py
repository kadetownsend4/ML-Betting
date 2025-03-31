from flask import Flask, jsonify
from sqlstuff import sql_NBAModel, sqlalchemy_interact

app = Flask(__name__)


@app.route("/", methods=['GET'])
def home():
    return "Better Picks"


@app.route("/mem", methods=['GET'])
def get_acc():
    lr_og = sql_NBAModel.NBAModel("OG", "GNB")
    lr_og.preprocess_data("SELECT * FROM BetterPicks.nbagamelogs")
    lr_og.run("2021-09-03", "2022-02-03", "2021-01-01", "2021-04-29")
    lr_og.calc_metrics()
    lr_og.format_predictions()
    sqlalchemy_interact.insert_df_to_mysql_sqlalchemy(
        lr_og.get_database_df(), "pred")
    return jsonify(lr_og.get_database_df()["HOME_W_PROB"].to_list())


if __name__ == '__main__':
    app.run(port=3000, debug=True)
