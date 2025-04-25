from NBAModel import NBAModel

lr_og = NBAModel("OG", "GNB")

print(lr_og.get_feature_set())
print(lr_og.get_model_name())
lr_og.preprocess_data("GettingData/gameLogs.csv")
lr_og.run("2021-09-03", "2022-02-03", "2020-05-01", "2021-04-29")
lr_og.calc_metrics()
lr_og.format_predictions()
print(lr_og.get_accuracy())