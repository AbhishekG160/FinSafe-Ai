# from flask import Flask, request, jsonify
# from auth_predict import predict_auth
# from transaction_predict import predict_transaction

# app = Flask(__name__)

# @app.route('/predict/auth', methods=['POST'])
# def auth_prediction():
#     data = request.json
#     result = predict_auth(data)  # Call your ML model
#     return jsonify(result)

# @app.route('/predict/transaction', methods=['POST'])
# def transaction_prediction():
#     data = request.json
#     result = predict_transaction(data)  # Call your ML model
#     return jsonify(result)

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)

# from flask import Flask, request, jsonify
# from auth_predict import predict_auth 
# from flask_cors import CORS  # ✅ Import CORS

# app = Flask(__name__)
# CORS(app, origins=["http://127.0.0.1:5173"])


# @app.route('/predict/auth', methods=['POST'])
# def auth_prediction():
#     try:
#         # Get input JSON from request
#         user_input = request.json
#         result = predict_auth(user_input)  # ✅ Call predict_auth function
#         return jsonify(result)

#     except Exception as e:
#         return jsonify({"error": str(e)})

# if __name__ == '__main__':
#     app.run(debug=True, port=3000)


from flask import Flask, request, jsonify
from flask_cors import CORS 
from auth_predict import predict_auth 

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5173"}}) 
CORS(app)

@app.route('/predict/auth', methods=['POST'])
@app.route('/predict/auth', methods=['POST'])

def auth_prediction():
    try:
        user_input = request.json 
        result = predict_auth(user_input) 
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=3000)