from models import player,property,property_type,db

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

 

def get_data_user_by_id(id):
    data = player.query.get(id)
    # if data :
    #     table = db.session.query(property,property_type).filter(property_type.id == property.id_property_type).filter(property.id_player == id).all()
    #     print(table)
    #     data_user = []
    #     for (prop,tipo) in table:
    #         information ={
    #             'id':prop.id,
    #             'tipo_tabla': tipo.category
    #         }
    #         data_user.append(information)
    # return data_user
    # return table
        # data_user = []
        # for (prop, tipo) in table:
        #     tabla_user {
        #         'id' : prop.id
        #     }
    # user_data ={
    #     'id' : data.id,
    #     'name':data.name,
    #     'money':data.money,
    #     'password':data.password,
    #     'created_at':data.created_at
    # }
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
def update_money(player_id, new_money):
    user = player.query.get(player_id)
    if user:
        user.money = new_money
        db.session.commit()
        return True  
    return False

#------añadir una propiedad a un jugador-----
def add_property(player_id, property_data):
    new_property = property(
        id_player=player_id,
        id_property_type=property_data['id_property_type'],
        cost_property=property_data['cost_property']
    )
    db.session.add(new_property)
    db.session.commit()
    return True  





    





