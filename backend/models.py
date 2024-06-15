from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    money = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())

class property_type(db.Model):
    __tablename__ = 'properties_types'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(255), unique=True, nullable=False)
    time_to_build = db.Column(db.DateTime, nullable=False)
    profits = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())

class property(db.Model):
    __tablename__ = 'properties'
    id = db.Column(db.Integer, primary_key=True)
    id_player = db.Column(db.Integer, db.ForeignKey('players.id'))
    id_property_type = db.Column(db.Integer, db.ForeignKey('properties_types.id'))
    cost_property = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())


