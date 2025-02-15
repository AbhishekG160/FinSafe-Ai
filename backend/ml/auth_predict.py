# import sys
# import json
# import joblib
# import pandas as pd
# import os 

# auth_model = joblib.load("/Users/meghna/Desktop/sih-2023-it-log-master/backend/ml2/auth_fraud_model.pkl")
# auth_encoder = joblib.load("/Users/meghna/Desktop/sih-2023-it-log-master/backend/ml2/auth_encoder.pkl")
# auth_scaler = joblib.load("/Users/meghna/Desktop/sih-2023-it-log-master/backend/ml2/auth_scaler.pkl")

# # BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get current directory
# # MODEL_PATH = os.path.join(BASE_DIR, "auth_fraud_model.pkl")  # Full path

# # auth_model = joblib.load(MODEL_PATH)  # Load model
# # auth_encoder = joblib.load("ml/auth_encoder.pkl")
# # auth_scaler = joblib.load("ml/auth_scaler.pkl")
# # Get input from Node.js
# user_input = json.loads(sys.argv[1])
# input_df = pd.DataFrame([user_input])

# # Encode categorical values
# label_cols = ["DeviceType", "OS_BrowserInfo", "MFAStatus", "APIAccess", "PrivilegedAccess"]
# for col in label_cols:
#     input_df[col] = auth_encoder.transform(input_df[col])

# # Scale numerical values
# input_df[["LoginTimestamp"]] = auth_scaler.transform(input_df[["LoginTimestamp"]])

# # Make prediction
# auth_risk = auth_model.predict(input_df)[0]
# print(int(auth_risk))  # Output prediction for Node.js

import joblib
import pandas as pd

# Load models
auth_model = joblib.load("/Users/meghna/Desktop/sih-2023-it-log-master/backend/ml2/auth_fraud_model.pkl")
auth_encoder = joblib.load("/Users/meghna/Desktop/sih-2023-it-log-master/backend/ml2/auth_encoder.pkl")
auth_scaler = joblib.load("/Users/meghna/Desktop/sih-2023-it-log-master/backend/ml2/auth_scaler.pkl")

def predict_auth(user_input):
    """Function to process input data and return predictions"""
    try:
        input_df = pd.DataFrame([user_input])

        # Encode categorical values
        label_cols = ["DeviceType", "OS_BrowserInfo", "MFAStatus", "APIAccess", "PrivilegedAccess"]
        for col in label_cols:
            input_df[col] = auth_encoder.transform(input_df[col])

        # Scale numerical values
        input_df[["LoginTimestamp"]] = auth_scaler.transform(input_df[["LoginTimestamp"]])

        # Make prediction
        auth_risk = auth_model.predict(input_df)[0]
        return {"auth_risk": int(auth_risk)}

    except Exception as e:
        return {"error": str(e)}
