def list_fields(obj):
    return [f.name for f in obj.__table__.columns]

def to_geometry_geojson(obj):
    return {
        "type": "Point",
        "coordinates": [ obj.longitude, obj.latitude ]
    }

def to_props(obj, fields=[]):
    if not fields:
        fields = list_fields(obj)
    return dict(zip(fields, map(lambda f: getattr(obj, f), fields)))


def to_geojson(obj, fields=[]):
    return {
        "type": "Feature",
        "properties": to_props(obj, fields),
        "geometry": to_geometry_geojson(obj)
    }