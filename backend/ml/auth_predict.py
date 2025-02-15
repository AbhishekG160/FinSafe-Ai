import sys
import json
import joblib
import pandas as pd

# Load the Auth Fraud model
auth_model = joblib.load("ml/auth_fraud_model.pkl")
auth_encoder = joblib.load("ml/auth_encoder.pkl")
auth_scaler = joblib.load("ml/auth_scaler.pkl")

# Get input from Node.js
user_input = json.loads(sys.argv[1])
input_df = pd.DataFrame([user_input])

# Encode categorical values
label_cols = ["DeviceType", "OS_BrowserInfo", "MFAStatus", "APIAccess", "PrivilegedAccess"]
for col in label_cols:
    input_df[col] = auth_encoder.transform(input_df[col])

# Scale numerical values
input_df[["LoginTimestamp"]] = auth_scaler.transform(input_df[["LoginTimestamp"]])

# Make prediction
auth_risk = auth_model.predict(input_df)[0]
print(int(auth_risk))  # Output prediction for Node.js
