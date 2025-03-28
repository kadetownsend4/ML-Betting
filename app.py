from flask import Flask
from sqlstuff import sql_NBAModel

app = Flask(__name__)


@app.route("/", methods=['GET'])
def get_acc():
    lr_og = sql_NBAModel.NBAModel("OG", "GNB")
    lr_og.preprocess_data("SELECT * FROM BetterPicks.nbagamelogs")
    lr_og.run("2021-09-03", "2022-02-03", "2020-05-01", "2021-04-29")
    lr_og.calc_metrics()
    lr_og.format_predictions()
    return {"accuracy": str(lr_og.get_accuracy())}


if __name__ == '__main__':
    app.run(port=3000, debug=True)
