from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class player(db.model):
    __tablename__ = 'players'
    id = db.column(db.Integer, primary_key=True)
    name = db.column(db.String(31), nullable=False, unique=True)
    money = db.column(db.Integer, nullable=False)
    created_at = db.column(db.DateTime, default=datetime.datetime.now())

class property_type(db.model):
    __tablename__ = 'properties_types'
    id = db.column(db.Integer, primary_key=True)
    category = db.column(db.String(31), unique=True, nullable=False)
    time_to_build = db.column(db.DateTime, nullable=False)
    profits = db.column(db.Integer, nullable=False)
    created_at = db.column(db.DateTime, default=datetime.datetime.now())

class property(db.model):
    __tablename__ = 'properties'
    id = db.column(db.Integer, primary_key=True)
    id_player = db.column(db.Integer, db.ForeignKey('player.id'))
    id_property = db.column(db.Integer, db.ForeignKey('property.id'))
    cost_property = db.column(db.Integer, nullable=False)
    crated_at = db.column(db.DateTime, default=datetime.datetime.now())

