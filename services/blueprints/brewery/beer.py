from services.utils.swagger import create_response, delete_response
from flask_restx import Resource, Namespace
from flask_accepts import accepts, responds
from flask import request
from .models import Beer, session
from .schemas import BeerSchema
from services.utils import query_table, get_query_model, parse_args, update_response, success, create_response, delete_response

beer_ns = Namespace('Beers', 'Beer API Methods')


@beer_ns.route('/beers')
class BeersHandler(Resource):

    @accepts(*get_query_model(Beer), api=beer_ns)
    @responds(schema=BeerSchema(many=True), api=beer_ns)
    def get(self):
        """find beers"""
        # override the dump schema
        # return FeatureCollectionSchema()\
        #     .dump(session.query(Beer)\
        #     .order_by(Beer.name)\
        #     .all())
        return query_table(Beer, session, **parse_args(request))

    @accepts(schema=BeerSchema, api=beer_ns)
    @responds(*create_response(), api=beer_ns, status_code=201)
    def post(self):
        """create a new beer"""
        beer = BeerSchema().load(request.json)
        print('new beer???', beer)
        session.add(beer)
        session.commit()
        return success(message='created new beer', id=beer.id)

@beer_ns.route('/beers/<int:id>')
class BeerHandler(Resource):

    @accepts(schema=BeerSchema(partial=True), api=beer_ns)
    @responds(*update_response())
    def patch(self, id):
        """update properties of a beer"""
        beer = session.query(Beer).get(id)
        if beer is not None:
            for k,v in request.json.items():
                if k != 'id':
                    setattr(beer, k, v)
            session.commit()
            return success(message='successfully updated beer', brewry=BeerSchema().dump(beer))
        return success(message='no beer found')

    @responds(*delete_response())
    def delete(self, id):
        """update properties of a beer"""
        beer = session.query(Beer).get(id)
        if beer is not None:
            session.delete(beer)
            session.commit()
            return success(message='successfully deleted beer', id=id)
        return success(message='no beer found')

