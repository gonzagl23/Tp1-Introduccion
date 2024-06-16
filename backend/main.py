from flask import Flask, request, jsonify
from models import db, player, property_type, property
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
port = 5000
app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql+psycopg2://postgres:uriel@localhost:5432/clicker'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

@app.route('/signin',methods=['POST'])
def get_user_validation():
    data = request.get_json()
    print(data)
    return {"message":True}

@app.route('/')
def index():
    usuarios = player.query.all()
    lista_usuarios = []
    for user in usuarios:
        usuario_data = {
                'id' : user.id,
                'nombre': user.name,
                'plata':user.money,
                'password' : user.password,
                'fecha_creacion': user.created_at,
            }
        lista_usuarios.append(usuario_data)
    return lista_usuarios

@app.route('/sigup',methods=['POST'])
def send_user():
    try:
        data = request.get_json()
        nuevo_usuario = player(name = data['name'],password = data['pass'],money = 0)
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({"usuario":data['name'],"clave":data['pass']},201)
    except:
        return jsonify({"message":"no se pudo crear el usuario"},500)


if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)