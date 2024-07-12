from flask import Flask, request, jsonify
from models import db
from database.user import get_user_by_name,created_user,get_data_user_by_id,get_data_table_all,get_table_ranking,get_all_user,add_property,update_user,property_filter_by_id,delete_property_by_id
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


# GET DATA USER BY ID 
@app.route('/get_data_user/<id>')
def data_by_id(id):
    return jsonify(get_data_user_by_id(id))


# VALIDATION USER
@app.route('/signin',methods=['POST'])
def get_user_validation():
    data = request.get_json()
    user = get_user_by_name(data['name'])
    if user and user['password'] == data['password']:
        return jsonify({"message":user['id']})   
    return jsonify({"message":"ERROR"})

# GET DATA TABLE
@app.route('/information_table/')
def get_data_table():
    return jsonify(get_data_table_all())

# GET ALL DATA PROPERTY BY ID
@app.route('/property_buy/<id>')
def get_property(id):
    return jsonify(property_filter_by_id(id))


# DELETE PROPERTY TIME COMPLETED WORK
@app.route('/delete_property/<id>/property_id/<id_property>',methods=['DELETE'])
def delete_property(id,id_property):
    try:
        amount = delete_property_by_id(id,id_property)
        return jsonify({"message": amount})
    except:
        return jsonify({"message":"error"})

# GET ALL USERS
@app.route('/table_ranking')
def table_ranking():
   return jsonify(get_table_ranking())

# INDEX
@app.route('/')
def index():
    return jsonify(get_all_user())
    
# CREATE USER 
@app.route('/sigup',methods=['POST'])
def send_user():
    try:
        data = request.get_json()
        created_user(data['name'],data['password'])
        return jsonify({"message":"SUCCES"})
    except:
        return jsonify({"message":"ERROR"})

# CREATE PROPERTY
@app.route('/create_property',methods=['POST'])
def create_property():
    data = request.get_json()
    add_property(data['id_user'],data['id_property'])
    return jsonify({"message":"succes"})

# UPDATE DATA USER 
@app.route('/update_user', methods=['PUT'])
def update_money_route():
    data = request.get_json()
    update_user(data['id'],data['money'])
    return jsonify({"message": "user updated successfully"})


if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)