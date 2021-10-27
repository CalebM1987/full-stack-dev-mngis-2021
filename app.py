from flask import Flask
from flask_cors import CORS
from services.blueprints.brewery import brewery_blueprint

app = Flask(__name__)
cors = CORS(app)

app.register_blueprint(brewery_blueprint)

if __name__ == '__main__':

    app.run(debug=True)

