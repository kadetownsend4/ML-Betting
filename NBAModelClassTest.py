from NBAModelClass import ModelClass

lr_og = ModelClass("CF", "RF")

print(lr_og.get_feature_set())
print(lr_og.get_model_name())
lr_og.preprocess_data("GettingData/gameLogs.csv")
lr_og.run("2021-05-01", "2022-06-03", "2020-05-01", "2021-04-29")
lr_og.get_metrics()
