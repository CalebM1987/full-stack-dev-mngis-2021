from flask_restx import Api 
from .blueprint import brewery_blueprint
from .brewery import brewery_ns
from .beer import beer_ns
print('brewry_ns: ', brewery_ns)

brewery_swagger_api = Api(
    brewery_blueprint,
    title='Brewery Finder API',
    description='API for Brewery Finder Application',
    doc='/help'
)

namespaces = [ brewery_ns, beer_ns ]
for namespace in namespaces:
    brewery_swagger_api.add_namespace(namespace)
print('api? ', brewery_swagger_api)