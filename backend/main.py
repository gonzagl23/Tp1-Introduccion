from flask import Flask, request, jsonify
from models import db
from database.user import get_all_user,get_user_by_name,created_user,get_data_user_by_id
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
port = 5000
app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql+psycopg2://postgres:uriel@localhost:5432/clicker'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False



@app.route('/get_user/<name>')
def get_data_user(name):
    return jsonify(get_user_by_name(name))


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

if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)