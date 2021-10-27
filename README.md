# full-stack-dev-mngis-2021

## presentation

The presentation is a [reveal.js]() presentation.  You can view it by opening the `presentation/index.html` in your browser or with node/express:

```
cd presentation
npm install
npm start
```

This should start the presentation at [http://localhost://8000](http://localhost://8000)

## Vue App

The vue app can be viewed in dev mode or as part of the flask service.  To open in dev mode, you will first need to start flask as shown below and then:

```
cd brewery-finder
npm install
npm run serve
```

Otherwise, if you want to view this app as part of the flask service, do the following BEFORE starting the flask service

```
cd brewery-finder
npm install
npm run build
```

This will build and deploy the app to be hosted as part of the flask service.  When you follow the steps below to start the service, you can find it at

[http://localhost:5000/brewery/app](http://localhost:5000/brewery/app)

![app](/resources/app.png)

## Flask Service

The flask service can be ran via running the `app.py` file.  However, you must first install the dependencies:

```
pip install -r requirements.txt
```

then run it:
```
cd <this directory>
python app.py
```

This should start on [http://localhost://8000](http://localhost://5000).  You can visit the Swagger UI page at [http://localhost://5000/brewery/help](http://localhost://5000/brewery/help)