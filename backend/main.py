from flask import Flask, request, jsonify
from models import db
from database.user import get_all_user,get_user_by_name,created_user,get_data_user_by_id, update_money
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
port = 5000
app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql+psycopg2://postgres:uriel@localhost:5432/clicker'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False


 # DATA GAME
@app.route('/get_user/<name>')
def get_data_user(name):
    return jsonify(get_user_by_name(name))

@app.route('/get_data/<id>')
def data_by_id(id):
    print(get_data_user_by_id(id))
    data = get_data_user_by_id(id)
    return jsonify({'name':data['name'],'money':data['money']})


# VALIDATION USER
@app.route('/signin',methods=['POST'])
def get_user_validation():
    data = request.get_json()
    user = get_user_by_name(data['name'])
    if user and user['password'] == data['password']:
        return jsonify({"message":user['id']})#,'user':user['user'],'worker':user['worker'],"house":user['house'],'departament':user['departament'],"mansion":user['mansion']})    
    return jsonify({"message":"ERROR"})


# GET ALL USERS
@app.route('/')
def index():
   return jsonify(get_all_user())

    
# DATA FROM DATABASE
@app.route('/sigup',methods=['POST'])
def send_user():
    try:
        data = request.get_json()
        created_user(data['name'],data['password'])
        return jsonify({"message":"SUCCES"})
    except:
        return jsonify({"message":"ERROR"})


# UPDATE 
@app.route('/update_money', methods=['PUT'])
def update_money_route():
    data = request.get_json()
    id = data.get('id')
    money = data.get('money')
    if update_money(id, money):
        return jsonify({"message": "Money updated successfully"})
    return jsonify({"message": "Player not found"})

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