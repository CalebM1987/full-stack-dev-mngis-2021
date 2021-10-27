
import os, sys, json
thisDir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(thisDir))
print('thisdir: ', os.path.dirname(thisDir))
from services.blueprints.brewery.schemas import FeatureSchema, FeatureCollectionSchema
from services.blueprints.brewery.models import Brewery, session
from sqlalchemy import String

# brewery = session.query(Brewery).first()
# fc = FeatureCollectionSchema().dump(brewery)
# print(json.dumps(fc, indent=2))
# fcObj = FeatureCollectionSchema().load(fc)
# print(fcObj)
# ft = FeatureSchema().dump(brewery)
# print(json.dumps(ft, indent=2))
# obj = FeatureSchema().load(ft)
# print(obj)
print(String)
for col in Brewery.__table__.columns:
    # print(col.name, col.type, type(col.type))
    print(col.name, issubclass(col.type.__class__, String))