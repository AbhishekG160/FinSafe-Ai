


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