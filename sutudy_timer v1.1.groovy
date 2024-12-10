from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

# JSONファイルに保存された記録を読み込む
def load_data():
    if os.path.exists("data.json"):
        with open("data.json", "r") as file:
            return json.load(file)
    return {"total_study_time": 0, "experience_points": 0, "level": 1}

# JSONファイルにデータを保存する
def save_data(data):
    with open("data.json", "w") as file:
        json.dump(data, file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/update', methods=['POST'])
def update():
    data = load_data()
    new_time = request.json.get("study_time", 0)
    data["total_study_time"] += new_time

    # 経験値とレベル計算
    data["experience_points"] += new_time
    if data["experience_points"] >= data["level"] * 100:
        data["experience_points"] -= data["level"] * 100
        data["level"] += 1

    save_data(data)
    return jsonify(data)

@app.route('/data', methods=['GET'])
def data():
    return jsonify(load_data())

if __name__ == '__main__':
    app.run(debug=True)
