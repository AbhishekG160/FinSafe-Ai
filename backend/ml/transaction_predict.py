import sys
import json
import joblib
import pandas as pd

# Load the Transaction Fraud model
transaction_model = joblib.load("ml/transac_fraud_model.pkl")
transaction_scaler = joblib.load("ml/transaction_scaler.pkl")

# Get input from Node.js
user_input = json.loads(sys.argv[1])
input_df = pd.DataFrame([user_input])

# Scale numerical values
num_cols = ["TransactionAmount", "OldBalanceOrig", "NewBalanceOrig"]
input_df[num_cols] = transaction_scaler.transform(input_df[num_cols])

# Make prediction
transaction_risk = transaction_model.predict(input_df)[0]
print(int(transaction_risk))  # Output prediction for Node.js
