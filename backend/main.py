from flask import Flask, request, jsonify
from models import db, player, property_type, property

app = Flask(__name__)
port = 5000
app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql+psycopg2://postgres:uriel@localhost5432/clicker'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

@app.route('/')
def hello_world():
    return 'Hello world!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=port)
