from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import matplotlib
import numpy as np
import seaborn as sns
import json
import matplotlib.pyplot as plt
import plotly.graph_objects as go
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.impute import SimpleImputer
from sklearn.tree import DecisionTreeClassifier
from src.data_preprocessing import preprocess_data
from src.feature_engineering import calculate_driver_features
from src.feature_engineering import feature_selection
from src.eda import exploratory_data_analysis
from src.model_training import train_model
from src.model_training import model_interpretation
from src.model_training import model_interpretation_importance
from src.model_training import model_accuracy
from src.model_training import predict

app = Flask(__name__)
CORS(app)


@app.route('/api/race/<int:raceID>', methods=['GET'])
def get_race(raceID):
    # Example race data (you would typically fetch this from a database)
    pd.set_option('display.max_columns', None)

    folder_path = 'data'

    df, drivers_df, constructors_df = preprocess_data(folder_path)
    df = calculate_driver_features(df)
    df_final = feature_selection(df)
    df_final_encoded = exploratory_data_analysis(df_final)

    data = predict(raceID, df_final_encoded, df_final, drivers_df, constructors_df)
    df_json = data.to_json(orient='records')
    
    response = {
        "raceID": int(raceID),
        "predictions": json.loads(df_json)
    }
    
    
    return response
# train_model(df_final_encoded) 
   

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
