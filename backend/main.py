from flask import Flask, request, jsonify
from models import db
from database.user import get_all_user,get_user_by_name,created_user,get_data_user_by_id, update_money, add_property,update_user
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
port = 5000
app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql+psycopg2://postgres:uriel@localhost:5432/clicker'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False



@app.route('/get_user/<name>')
def get_data_user(name):
    return jsonify(get_user_by_name(name))

@app.route("/update_data", methods=['PUT'])
def update_data():
    data = request.get_json()
    print(data)
    return jsonify(update_user(data['id'],data['money']))


@app.route('/get_data/<id>')
def data_by_id(id):
    return jsonify(get_data_user_by_id(id))

@app.route('/signin',methods=['POST'])
def get_user_validation():
    data = request.get_json()
    user = get_user_by_name(data['name'])
    if user == None:
        return jsonify({"message":"ERROR"})
    if user['password'] == data['password']:
        return jsonify({"message":user})
    return jsonify({"message":"ERROR"})

@app.route('/')
def index():
    try:
        return jsonify(get_all_user())
    except:
        return jsonify(None)
    

@app.route('/sigup',methods=['POST'])
def send_user():
    try:
        data = request.get_json()
        return jsonify(created_user(data['name'],data['pass']),201)
    except:
        return jsonify(None,500)

# app.route('/update_money/<int:player_id>', methods=['PUT'])
# def update_money_route(player_id):
#     data = request.get_json()
#     new_money = data.get('money')
#     if update_money(player_id, new_money):
#         return jsonify({"message": "Money updated successfully"})
#     return jsonify({"message": "Player not found"}), 404

# @app.route('/add_property/<int:player_id>', methods=['POST'])
# def add_property_route(player_id):
#     data = request.get_json()
#     if add_property(player_id, data):
#         return jsonify({"message": "Property added successfully"})
#     return jsonify({"message": "Failed to add property"}), 500
 

if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)