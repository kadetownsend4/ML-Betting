from NBAModelClass import ModelClass

svm_og = ModelClass("CF", "SVM")

print(svm_og.get_feature_set())
print(svm_og.get_model_name())
print(svm_og.preprocess_data("GettingData/gameLogs.csv"))