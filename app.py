# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask import jsonify
from flask import request

import sqlite3

from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import query

from os import path



app = Flask(__name__)


Base = declarative_base()

class Place(Base):
    """Place object definition."""

    __tablename__ = 'places'

    id = Column(Integer, primary_key=True)
    description = Column(String)
    suggested_by=Column(Integer)
    visited=Column(String)

    def __init__(self, description, suggested_by, visited):
        """Place constructor."""
        self.description = description
        self.suggested_by=suggested_by
        self.visited=visited

class Story(Base):
    """Story object definition."""

    __tablename__ = 'stories'

    id = Column(Integer, primary_key=True)
    story = Column(String)
    to_tell_by=Column(Integer)
    told=Column(String)

    def __init__(self, story, to_tell_by, told):
        """Story constructor."""
        self.story = story
        self.to_tell_by=to_tell_by
        self.told=told

@app.route('/')
def hello_world():
    return 'Hello from Flask-new route!'

ROOT = path.dirname(path.realpath(__file__))

@app.route('/api/tasks/1', methods=['GET'])
def retrieve_task():
    conn = sqlite3.connect(path.join(ROOT, "todo.db"))

    crs = conn.cursor()
    sql = \
        '''
          select id, description from tasks where id=1
        '''
    crs.execute(sql)

    row = crs.fetchone()
    id = row[0]
    description = row[1]
    data = {
        'id': id,
        'description': description
    }
    return jsonify(data)

@app.route('/api/admins', methods=['GET'])
def admins():
    """Retrieve all admins."""
    conn = sqlite3.connect(path.join(ROOT, "todo.db"))
    crs = conn.cursor()
    sql = \
        '''
          select id, email, password,name from admins
        '''
    crs.execute(sql)
    rows = crs.fetchall()
    admins=[]
    for row in rows:
        id = row[0]
        email = row[1]
        password=row[2]
        name=row[3]
        data = {
            'id': id,
            'email': email,
            'password':password,
            'name':name
        }
        admins.append(data)
    conn.close()
    return jsonify(admins)

@app.route('/api/places', methods=['GET'])
def places():
    """Retrieve all places."""
    conn = sqlite3.connect(path.join(ROOT, "todo.db"))
    crs = conn.cursor()
    sql = \
        '''
          select id, description, suggested_by, visited from places
        '''
    crs.execute(sql)
    rows = crs.fetchall()
    places=[]
    for row in rows:
        id = row[0]
        description = row[1]
        suggested_by=row[2]
        visited=row[3]
        data = {
            'id': id,
            'description': description,
            'suggested_by':suggested_by,
            'visited':visited
        }
        places.append(data)
    conn.close()
    return jsonify(places)

@app.route('/api/stories', methods=['GET'])
def stories():
    """Retrieve all stories."""
    conn = sqlite3.connect(path.join(ROOT, "todo.db"))
    crs = conn.cursor()
    sql = \
        '''
          select id, story, to_tell_by, told from stories
        '''
    crs.execute(sql)
    rows = crs.fetchall()
    stories=[]
    for row in rows:
        id = row[0]
        story = row[1]
        to_tell_by=row[2]
        told=row[3]
        data = {
            'id': id,
            'story': story,
            'to_tell_by':to_tell_by,
            'told':told
        }
        stories.append(data)
    conn.close()

    return jsonify(stories)

@app.route('/api/addstory', methods=['POST'])
def create_story():
    engine = create_engine('sqlite:///'+path.join(ROOT,'todo.db'))
    Session = sessionmaker(bind=engine)
    session = Session()
    """Create new story."""
    story = request.form['story']
    name=request.form['to_tell_by']
    told="false"
    if name=='Maja':
        to_tell_by=1
    else:
        to_tell_by=2
    add_story = Story(story,to_tell_by,told)
    """add_story=Story(name,"1",told)"""
    session.add(add_story)
    session.commit()
    return "hello"

@app.route('/api/addplace', methods=['POST'])
def create_place():
    engine = create_engine('sqlite:///'+path.join(ROOT,'todo.db'))
    Session = sessionmaker(bind=engine)
    session = Session()
    """Create new place."""
    place = request.form['place']
    name=request.form['suggested_by']
    visited="false"
    if name=='Maja':
        suggested_by=1
    else:
        suggested_by=2
    add_place = Place(place,suggested_by,visited)
    """add_story=Story(name,"1",told)"""
    session.add(add_place)
    session.commit()
    return "hello"

@app.route('/api/deletestory/<int:story_id>', methods=['GET'])
def delete_story(story_id):
    engine = create_engine('sqlite:///'+path.join(ROOT,'todo.db'))
    Session = sessionmaker(bind=engine)
    session = Session()
    story2delete=session.query(Story).filter(Story.id == story_id).first()
    session.delete(story2delete)
    session.commit()
    return "helou"


@app.route('/api/deleteplace/<int:place_id>', methods=['GET'])
def delete_place(place_id):
    engine = create_engine('sqlite:///'+path.join(ROOT,'todo.db'))
    Session = sessionmaker(bind=engine)
    session = Session()
    place2delete=session.query(Place).filter(Place.id == place_id).first()
    session.delete(place2delete)
    session.commit()
    return "hello form deleting place"

@app.route('/api/changeplace', methods=['POST'])
def change_place():
    engine = create_engine('sqlite:///'+path.join(ROOT,'todo.db'))
    Session = sessionmaker(bind=engine)
    session = Session()
    place = request.form['place']
    name=request.form['suggested_by']
    visited_read=request.form['visited']
    id_read=request.form['id']

    if name=='Maja':
        suggested_by=1
    else:
        suggested_by=2
    if visited_read=="Not visited":
        visited="false"
    else:
        visited="true"

    
    place2change=session.query(Place).filter(Place.id == id_read).first()
    place2change.description=place
    place2change.suggested_by=suggested_by
    place2change.visited=visited
    session.commit()
    return "hello from changePlace"


@app.after_request
def after_request(response):
    """Tweak response."""
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response