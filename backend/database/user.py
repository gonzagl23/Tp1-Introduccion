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
    if data == None:
        return {"message":"ERROR"}
    user_data ={
        'id' : data.id,
        'name':data.name,
        'money':data.money,
        'password':data.password,
        'created_at':data.created_at
    }
    return {"message":user_data}       
   
def created_user(name,password):
    new_user = player(name=name,password=password,money=0)
    db.session.add(new_user)
    db.session.commit()
    user_data = {
        'id' : new_user.id,
        'name':new_user.name,
        'money':new_user.money,
        'password':new_user.password,
        'created_at':new_user.created_at
    }
    return user_data
    

def update_user(id,money):
    user = get_data_user_by_id(id)
    if user['message'] == "ERROR":
        return user
    print(user['message']['money'])
    user['message']['money'] +=  money
    db.session.commit()
    print(user['message']['money'])
    return {"message":"SUCCESS","usuario":user['message']}



    





