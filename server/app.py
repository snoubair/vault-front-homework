import time
from flask import Flask, jsonify, request
from flask_cors import CORS

from mock_data import mock_data

app = Flask(__name__)
CORS(app)

# very naive search function, for the example
def search(data, query):
    query = query.lower()
    results = []
    for item in data:
        searchable_text = item["type"].lower()
        if "data" in item:
            if "unit" in item["data"]:
                searchable_text += f" {item['data']['unit'].lower()}"
            if "name" in item["data"]:
                searchable_text += f" {item['data']['name'].lower()}"
            if "from" in item["data"]:
                searchable_text += f" {item['data']['from'].lower()}"
            if "to" in item["data"]:
                searchable_text += f" {item['data']['to'].lower()}"
        if query in searchable_text:
            results.append(item)
    return results

@app.route('/search')
def search_handler():
    # simulate long request
    time.sleep(1)

    search_text = request.args.get('q')
    if not search_text:
        return jsonify(mock_data)
    filtered = search(mock_data, search_text)
    return jsonify(filtered)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
