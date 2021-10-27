import os
from flask import Blueprint

staticDir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'static')

brewery_blueprint = Blueprint(
    'breweries_api',
    __name__, 
    static_folder=staticDir, 
    url_prefix='/brewery'
)

@brewery_blueprint.route('/app')
def brewery_app():
    brewery_blueprint.send_static_file('index.html')
