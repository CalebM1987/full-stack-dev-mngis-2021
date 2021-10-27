from re import L
from marshmallow import Schema, fields, EXCLUDE, post_load
from .models import Brewery, Beer, session
from .utils import list_fields, to_geometry_geojson, to_props, to_geojson

class BaseSchema(Schema):
    class Meta:
        unknown = EXCLUDE

class BrewerySchema(BaseSchema): 
    
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    address = fields.String()
    city = fields.String()
    state = fields.String()
    zip = fields.String()
    monday = fields.String()
    tuesday = fields.String(missing=None)
    wednesday = fields.String(missing=None)
    thursday = fields.String(missing=None)
    friday = fields.String(missing=None)
    saturday = fields.String(missing=None)
    sunday = fields.String(missing=None)
    comments = fields.String(missing=None)
    brew_type = fields.String(missing='Brewery')
    website = fields.String(missing=None)
    longitude = fields.Float(required=True)
    latitude = fields.Float(required=True)

    def get_geometry(self, obj):
        return to_geometry_geojson(obj)

    @post_load
    def to_brewery(self, data, **kwargs):
        """convert geojson to flattened Brewery object"""
        return Brewery(**data)


class PointGeometrySchema(Schema):
    type = fields.String(missing='Point', dump_only=True)
    coordinates = fields.List(fields.Float)

class FeatureModel(Schema):
    properties = fields.Nested(BrewerySchema)
    geometry = fields.Nested(PointGeometrySchema)

class FeatureSchema(Schema):
    type = fields.Method('get_type', deserialize='get_type')
    properties = fields.Method('get_properties', deserialize='load_properties')
    geometry = fields.Method('get_geometry', deserialize='load_geometry')
    # properties = fields.Nested(BrewerySchema)
    # geometry = fields.Nested(PointGeometrySchema)

    @post_load
    def to_brewery(self, data, **kwargs):
        """convert geojson to flattened Brewery object"""
        return Brewery(**data.get('properties', {}))

    def get_type(self, obj):
        return 'Feature'

    def get_properties(self, obj):
        return to_props(obj)

    def load_properties(self, value):
        return value

    def get_geometry(self, obj):
        return to_geometry_geojson(obj)

    def load_geometry(self, value):
        return value

class FeatureCollectionResponse(Schema):
    type = fields.String(missing='FeatureCollection', dump_only=True)
    features = fields.List(fields.Nested(FeatureModel), many=True)

class FeatureCollectionSchema(Schema):
    type = fields.Method('get_type', deserialize='get_type')
    features = fields.Method('get_features', deserialize='load_features')
    # type = fields.String(missing='FeatureCollection', dump_only=True)
    # features = fields.List(fields.Nested(FeatureSchema), many=True)

    def get_type(self, obj):
        return 'FeatureCollection'


    def get_features(self, obj):
        """dump to geojson"""
        if not obj:
            return []
        if not isinstance(obj, list):
            obj = [obj]
        fields = list_fields(obj[0])
        return [to_geojson(o, fields) for o in obj]

    def load_features(self, value):
        return value

    @post_load
    def to_brewery_objects(self, data, **kwargs):
        if not data:
            return []
        feats = data.get('features', [])
        return [ Brewery(**feat.get('properties', {})) for feat in feats ]


class BeerSchema(BaseSchema):
    id = fields.Integer(dump_only=True, help=Beer.id.doc)
    brewery_id = fields.Integer(help=Beer.brewery_id.doc)
    name = fields.String(required=True, help=Beer.name.doc)
    description = fields.String(required=True, help=Beer.name.description)
    style = fields.String(required=True, help=Beer.style.doc)
    category = fields.String(dump_only=True, help=Beer.category.doc)
    alc = fields.Float(description=Beer.alc.doc)
    ibu = fields.Integer(description=Beer.ibu.doc)
    color = fields.String(description=Beer.color.doc)
    photo_name = fields.String(dump_only=True, description=Beer.photo_name.doc)
    created_by = fields.Integer(dump_only=True, description=Beer.created_by.doc)

    @post_load
    def to_beer(self, data, **kwargs):
        """convert geojson to flattened Beer object"""
        return Beer(**data)
    


if __name__ == '__main__':
    import json
    brewery = session.query(Brewery).first()
    # ft = FeatureSchema().dump(brewery)
    # print(json.dumps(ft))
    fc = FeatureCollectionSchema().dump(brewery)
    print(json.dumps(fc, indent=2))
    # obj = FeatureSchema().load(ft)
    # print(obj)
