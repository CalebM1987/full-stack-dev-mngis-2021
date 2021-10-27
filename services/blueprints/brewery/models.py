import os
import sys
import shutil
import time
from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, Float, LargeBinary, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy import create_engine
from flask_login import UserMixin
from datetime import timedelta
from werkzeug.datastructures import FileStorage
from .utils import to_geometry_geojson
#from typing import Dict

# safe imports
__all__ = ('Beer', 'Brewery', 'BeerPhotos', 'User', 'Category', 'Style', 'engine', 'Base', 'session')

# db path, make sure "check_same_thread" is set to False
thisDir = os.path.dirname(__file__)
db_path = os.path.join(os.path.dirname(os.path.dirname(thisDir)), 'db').replace(os.sep, '/')
static_dir = os.path.join(thisDir, 'static')
beer_photo_dir = os.path.join(thisDir, 'img', 'beers')

# make sure folder exists
if not os.path.exists(db_path):
    os.makedirs(db_path)

# VERY IMPORTANT - our connection string.  SqlAlchemy can work with many different database formats
# we are using sqlite for demo purposes (using multithreaded to prevent locks)
brewery_str = 'sqlite:///{}/breweries.db?check_same_thread=False'.format(db_path) 

# get declaritive base context
Base = declarative_base()

# basic repr
def basic_repr(obj, attr):
    """ returns a basic representation of an object

    :param obj: table object
    :param attr: attribute used to label unique object
    """
    return '<{}: "{}">'.format(obj.__class__.__name__, getattr(obj, attr))


class Beer(Base):
    __tablename__ = 'beer'
    id = Column(Integer, primary_key=True, autoincrement=True)
    brewery_id = Column(Integer, ForeignKey('brewery.id'))
    name = Column(String(150))
    description = Column(String(500), default=None)
    style = Column(String(50), default=None)
    category = Column(String(100), default=None)
    alc = Column(Float, default=None)
    ibu = Column(Integer, default=None)
    color = Column(String(25), default=None)
    photo_name = Column(String(100), default=None)
    created_by = Column(Integer, ForeignKey('user.id'))
    brewery = relationship('Brewery', back_populates='beers')
    creator = relationship('User', back_populates='submitted_beers')

    def add_photo(self, image, name=None):
        # handle file path 
        if os.path.isfile(image):
            if not name:
                name = os.path.basename(name)
            shutil.copy2(image, os.path.join(beer_photo_dir, name))
        if not name:
            name = time.strftime('beer_%Y%m%d%H%M%S.png')

        if isinstance(image, FileStorage):
            print('filestorage: ', image, image.mimetype)
            with open(os.path.join(beer_photo_dir, name), 'wb') as f:
                f.write(image.stream.read())
            

        self.photo_name = name
        session.commit()

    def __repr__(self):
        return '<{}: "{}" ({})>'.format(self.__class__.__name__, self.name, self.style)


class Brewery(Base):
    __tablename__ = 'brewery'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))
    address = Column(String(100))
    city = Column(String(50))
    state = Column(String(2))
    zip = Column(String(11))
    monday = Column(String(30), default=None)
    tuesday = Column(String(30), default=None)
    wednesday = Column(String(30), default=None)
    thursday = Column(String(30), default=None)
    friday = Column(String(30), default=None)
    saturday = Column(String(30), default=None)
    sunday = Column(String(30), default=None)
    comments = Column(String(255), default=None)
    brew_type = Column(String(50), default='Brewery')
    website = Column(String(255), default=None)
    longitude = Column(Float)
    latitude = Column(Float)
    created_by = Column(Integer, ForeignKey('user.id'))
    creator = relationship('User', back_populates='submitted_breweries')
    beers = relationship('Beer', back_populates='brewery', cascade="all, delete-orphan")

    @property
    def geometry(self): # -> Dict:
        return to_geometry_geojson(self)

    def __repr__(self):
        return basic_repr(self, 'name')


class Style(Base):
    __tablename__ = 'style'
    id = Column(Integer, primary_key=True, autoincrement=True)
    category = Column(String(100), ForeignKey('category.name'))
    name = Column(String(100), nullable=False)

    def __repr__(self):
        return basic_repr(self, 'name')

class Category(Base):
    __tablename__ = 'category'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    styles = relationship('Style', cascade="all, delete-orphan")

    def __repr__(self):
        return basic_repr(self, 'name')


# this must implement Flask-Login's UserMixin class to work with decorators!
class User(Base, UserMixin):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    email = Column(String(100), nullable=False)
    created = Column(DateTime, default=datetime.utcnow())
    last_login = Column(DateTime)
    submitted_breweries = relationship('Brewery')
    submitted_beers = relationship('Beer')

    def __repr__(self):
        return basic_repr(self, 'email')

    def __str__(self):
        return repr(self)


# make sure all databases are created
engine = create_engine(brewery_str)
Base.metadata.create_all(engine)
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

if __name__ == '__main__':
    from models_old import Brewery as OldBrewery, Beer as OldBeer, Style as OldStyle, Category as OldCategory, session as old_session
    print('starting', OldBrewery, old_session)
    used = []
    skip_common = ['id', 'created_by', 'last_mod']
    skip_brewery = skip_common + ['x', 'y']
    skip_beer = skip_common + ['category']

    getFields = lambda t: [c.name for c in t.__table__.columns]
    # for ob in old_session.query(OldBrewery).all():
    #     # print(ob.name)
    #     key = f'{ob.name}-{ob.address}'
    #     if key not in used:
    #         breweryArgs = {f: getattr(ob, f) for f in getFields(ob) if f not in skip_brewery}
    #         breweryArgs['latitude'] = ob.y
    #         breweryArgs['longitude'] = ob.x
    #         nb = Brewery(**breweryArgs)
    #         session.add(nb)
    #         print(f'added brewery: "{ob.name}"')
    #         if ob.beers:
    #             print(f'found beers in brewery {ob.name}')
    #             for oldBeer in ob.beers:
    #                 beerArgs = {f: getattr(oldBeer, f) for f in getFields(oldBeer) if f not in skip_beer}
    #                 if oldBeer.style is not None:
    #                     style = old_session.query(OldStyle).filter_by(style_name=oldBeer.style).first()
    #                     if style is not None:
    #                         beerArgs['category'] = style.category.cat_name
    #                 newBeer = Beer(**beerArgs)
    #                 nb.beers.append(newBeer)

    # do styles and categorys
    for oc in old_session.query(OldCategory).all():
        session.add(Category(name=oc.cat_name))

        for style in oc.styles:
            session.add(Style(name=style.style_name, category=oc.cat_name))
        
    session.commit()
    print('done')
                    



