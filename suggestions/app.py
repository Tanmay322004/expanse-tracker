from flask import Flask, request, jsonify
from analyzer import generate_suggestions

app = Flask(__name__)

@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.get_json()
    suggestions = generate_suggestions(data['expenses'])
    return jsonify({'suggestions': suggestions})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
