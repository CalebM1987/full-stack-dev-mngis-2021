from services.utils.swagger import create_response, delete_response
from flask_restx import Resource, Namespace
from flask_accepts import accepts, responds
from flask import request
from .models import Brewery, Beer, session
from .schemas import FeatureCollectionSchema, FeatureCollectionResponse, BrewerySchema, BeerSchema
from services.utils import query_table, get_query_model, parse_args, update_response, success, create_response, delete_response

brewery_ns = Namespace('Breweries', 'Brewery API Methods', path='/breweries')


@brewery_ns.route('')
class BreweriesHandler(Resource):

    @accepts(*get_query_model(Brewery), api=brewery_ns)
    @responds(schema=BrewerySchema(many=True), api=brewery_ns)
    def get(self):
        """find breweries"""
        # override the dump schema
        # return FeatureCollectionSchema()\
        #     .dump(session.query(Brewery)\
        #     .order_by(Brewery.name)\
        #     .all())
        return query_table(Brewery, session, **parse_args(request))

    @accepts(schema=BrewerySchema, api=brewery_ns)
    @responds(*create_response(), api=brewery_ns, status_code=201)
    def post(self):
        """create a new brewery"""
        brewery = BrewerySchema().load(request.json)
        print('new brewery???', brewery)
        session.add(brewery)
        session.commit()
        return success(message='created new brewery', id=brewery.id)

@brewery_ns.route('/<int:id>')
class BreweryHandler(Resource):

    @accepts(schema=BrewerySchema(partial=True), api=brewery_ns)
    @responds(*update_response())
    def patch(self, id):
        """update properties of a brewery"""
        brewery = session.query(Brewery).get(id)
        if brewery is not None:
            for k,v in request.json.items():
                if k != 'id':
                    setattr(brewery, k, v)
            session.commit()
            return success(message='successfully updated brewery', brewry=BrewerySchema().dump(brewery))
        return success(message='no brewery found')

    @responds(*delete_response())
    def delete(self, id):
        """update properties of a brewery"""
        brewery = session.query(Brewery).get(id)
        if brewery is not None:
            session.delete(brewery)
            session.commit()
            return success(message='successfully deleted brewery', id=id)
        return success(message='no brewery found')

@brewery_ns.route('/<int:id>/beers')
class BreweryHandler(Resource):

    @responds(schema=BeerSchema(many=True), api=brewery_ns)
    def get(self, id):
        """find beers for a brewery"""
        brewery = session.query(Brewery).get(id)
        if brewery is not None:
            return brewery.beers
        return success(message='no brewery found')

    @accepts(schema=BeerSchema, api=brewery_ns)
    @responds(*create_response())
    def post(self, id):
        """add a beer to a brewery"""
        brewery = session.query(Brewery).get(id)
        if brewery is not None:
            beer = BeerSchema().load(request.json)
            print('beer??', beer, request.json)
            brewery.beers.append(beer)
            session.commit()
            return success(message='successfully created beer for brewery', id=beer.id)
        return success(message='no brewery found')

@brewery_ns.route('/geojson')
class BreweriesHandlerGeojson(Resource):

    @accepts(*get_query_model(Brewery), api=brewery_ns)
    @responds(schema=FeatureCollectionResponse, api=brewery_ns)
    def get(self):
        """fetch breweries as geojson"""
        res = query_table(Brewery, session, **parse_args(request))
        return FeatureCollectionSchema().dump(res)

    @accepts(schema=FeatureCollectionResponse, api=brewery_ns)
    @responds(*create_response(), api=brewery_ns)
    def post(self):
        """create a new brewery from geojson"""
        brewery = FeatureCollectionSchema().load(request.json)
        session.add(brewery)
        session.commit()
        return success(message='created new brewery', id=brewery.id)

