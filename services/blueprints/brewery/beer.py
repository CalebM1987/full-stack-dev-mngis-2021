import os
from services.utils.swagger import create_response, delete_response
from flask_restx import Resource, Namespace
from flask_accepts import accepts, responds
from flask import request, send_file
from .models import Beer, session, beer_photo_dir
from .schemas import BeerSchema
from services.utils import query_table, get_query_model, parse_args, update_response, success, create_response, delete_response, dynamic_error
from werkzeug.datastructures import FileStorage

beer_ns = Namespace('Beers', 'Beer API Methods', path='/beers')

@beer_ns.route('')
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

@beer_ns.route('/<int:id>')
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

@beer_ns.route('/<int:id>/photo')
class UploadPhoto(Resource):
    parser = beer_ns.parser()
    parser.add_argument('photo', type=FileStorage, help='the photo to upload', location='files')

    def set_photo(self, id):
        beer = session.query(Beer).get(id)
        if beer is not None:
            args = self.parser.parse_args()
            photo = args.get('photo')
            if photo:
                beer.add_photo(photo, photo.filename)
        return dynamic_error(message='no beer found')

    def get(self, id):
        """fetch beer photo"""
        beer = session.query(Beer).get(id)
        if beer is not None and beer.photo_name:
            return send_file(os.path.join(beer_photo_dir, beer.photo_name), attachment_filename=beer.photo_name)
        return dynamic_error(message='no photo found')

    def post(self, id):
        """upload a beer photo"""
        return self.set_photo(id)

    def put(self, id):
        """replace beer photo"""
        return self.set_photo(id)
        

