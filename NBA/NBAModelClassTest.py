from NBA.NBAModelClass import ModelClass

svm_og = ModelClass("CF", "SVM")

print(svm_og.get_feature_set())
print(svm_og.get_model_name())
print(svm_og.preprocess_data("GettingData/gameLogs.csv"))
print(svm_og.preprocessed_data)
print(svm_og.run("2021-05-01", "2022-06-03"))