
const express = require('express');

const morgan = require('morgan');

var bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const app = express(); 

app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());

// requiriendo rutas

const routesApi = require('./router/api');

const routesDelete = require('./router/delete');

const routesList = require('./router/list');

// settings vistas

app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');

app.use(express.static( __dirname + "/public" ));

//middlewares

app.use(morgan('combined'));

// Rutas

app.use('/api', routesApi);

app.use('/delete', routesDelete);

app.use('/list', routesList);

//app.get('*', ( req, res) => {res.render('error.ejs');});

///Server

app.listen(port);

console.log('server on '+ port);









