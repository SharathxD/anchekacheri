from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data
items = [
    {"id": 1, "name": "Item One"},
    {"id": 2, "name": "Item Two"},
    {"id": 3, "name": "Item Three"},
    {"id": 4, "name": "Item Four"},
    {"id": 5, "name": "Item Five"},
    {"id": 6, "name": "Item Six"},
    {"id": 7, "name": "Item Seven"},
    {"id": 8, "name": "Item Eight"},
    {"id": 9, "name": "Item Nine"},
    {"id": 10, "name": "Item Ten"}
]

@app.route('/')
def welcome():
    return "Welcome to the Flask API!"
# GET all items
@app.route('/items', methods=['GET'])
def get_items():
    return jsonify(items), 200

# GET single item by id
@app.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = next((item for item in items if item["id"] == item_id), None)
    if item:
        return jsonify(item), 200
    return jsonify({"error": "Item not found"}), 404

# POST create new item
@app.route('/items', methods=['POST'])
def create_item():
    data = request.get_json()
    new_item = {
        "id": items[-1]["id"] + 1 if items else 1,
        "name": data.get("name", "")
    }
    items.append(new_item)
    return jsonify(new_item), 201

# PUT update item by id
@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.get_json()
    for item in items:
        if item["id"] == item_id:
            item["name"] = data.get("name", item["name"])
            return jsonify(item), 200
    return jsonify({"error": "Item not found"}), 404

# DELETE item by id
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    global items
    items = [item for item in items if item["id"] != item_id]
    return jsonify({"message": "Item deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)