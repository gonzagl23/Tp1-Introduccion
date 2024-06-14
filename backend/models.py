from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class player(db.model):
    __tablename__ = 'players'
    id = db.column(db.Integer, primary_key=True)
    name = db.column(db.String{31}, nullable=False, unique=True)
    money = db.column(db.Integer)
    created_at = dbcolumn(db.DateTime, default=datetime.datetime.now())

class building_type(db.model):
    __tablename__ = 'building_types'
    id = db.column(db.Integer, primary_key=True)
    category = db.column(db.String{31}, unique=True, nullable=False)
    time_to_build = db.column(db.DateTime, nullable=False)
    cost = db.column(db.Integer, nullable=False)
    profits = db.column(db.Integer, nullable=False)
    created_at = dbcolumn(db.DateTime, default=datetime.datetime.now())

class building(db.model):
    __tablename__ = 'buildings'
    id = db.column(db.Integer, primary_key=True)
    id_player = db.column(db.Integer, db.ForeignKey('player.id')
    id_building = db.column(db.Integer, db.ForeignKey('building.id')
    built_at = dbcolumn(db.DateTime, default=datetime.datetime.now())

