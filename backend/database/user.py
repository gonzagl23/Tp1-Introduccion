from models import player,property,property_type,db
from sqlalchemy import desc
import datetime

def get_all_user():
    users = player.query.all()
    list_user = []
    for user in users:
        user_data ={
                'id' : user.id,
                'name': user.name,
                'money':user.money,
                'password' : user.password,
                'created_at': user.created_at,
        }
        list_user.append(user_data)
        
    return list_user


def get_user_by_name(username):
    user = player.query.filter_by(name=username).first()
    if user:
        user_data = {
        'id' : user.id,
        'name':user.name,
        'money':user.money,
        'password':user.password,
        'created_at':user.created_at
        }
        return user_data
    return user

def get_data_table_all():
    data = property_type.query.order_by(property_type.id).all()
    list = []
    for element in data:
        table = {
            'id':element.id,
            'category':element.category,
            'cost_property':element.cost_property,
            'time_to_build':element.time_to_build,
            'profits':element.profits,
        }
        list.append(table)
    return list

def get_table_ranking():
    # Get table ranking order by money desc 
    user = player.query.order_by(desc(player.money)).all()
    list = []
    for data in user:
        dicc = {
            'name': data.name,
            'money':data.money
        }
        list.append(dicc)
    return list
    
    

def get_data_user_by_id(id):
    data = player.query.get(id)
    user_data = {
        'name': data.name,
        'money':data.money,
    }
    return user_data
     
   
def created_user(name,password):
    # CREATE USER
    new_user = player(name=name,password=password,money=0)
    db.session.add(new_user)
    db.session.commit()

#-----actualizar el dinero de un jugador------
def update_user(player_id, new_money):
    user = player.query.get(player_id)
    user.money = new_money
    db.session.commit()

#------añadir una propiedad a un jugador-----
def add_property(player_id, property_id):
    data = property_type.query.get(property_id)
    new_property = property(
        id_player=player_id,
        id_property_type=data.id,
        time_completed_work = datetime.datetime.now() + datetime.timedelta(minutes=data.time_to_build)
    )
    db.session.add(new_property)
    db.session.commit()


def property_filter_by_id(id):
    data = property.query.filter_by(id_player=id).order_by(property.id_property_type).all()
    list = []
    date = datetime.datetime.now()
    for element in data:
        if date >= element.time_completed_work:
            element.state = True
            db.session.commit()
        data_property = {
            'id': element.id,
            'id_property_type' : element.id_property_type,
            'id_player': element.id_player,
            'state' : element.state,
            'time_completed_work' : element.time_completed_work,
            'created_at' : element.created_at
        }
        
        list.append(data_property)
    return list

def delete_property_by_id(id_user,id_property):
    data = property.query.filter_by(id_player=id_user,id_property_type=id_property,state=True).all()
    amount = 0
    for prop in data:
        db.session.delete(prop)
        db.session.commit()
        amount += 1
    
    return amount

def delete_user_by_id(id_user):
    data = property.query.filter_by(id_player=id_user).all()

    for element in data:
        db.session.delete(element)
    
    user = player.query.filter_by(id=id_user).first()
    db.session.delete(user)
    db.session.commit()

    




    





