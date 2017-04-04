/*jslint es6*/
const Express = require('express');
const Mongoose = require('mongoose');
const config = require('./buche_config.js');


let dbUrl = 'mongodb://' + config.db_settings['user']
          + ':' + config.db_settings['pass']
          + '@' + config.db_settings['host']
          + ':' + config.db_settings['port']
          + '/' + config.db_settings['name'];

let ResourceSchema = new Mongoose.Schema({
    "_id": String,
    "name": String,
    "host": String,
    "port": Number,
    "email": String,
    "last_status": String,
    "last_update": Date,
});

let ResourceModel = Mongoose.model('resource', ResourceSchema);


Mongoose.connect(dbUrl);


let BucheWebserver = Express();

BucheWebserver.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

BucheWebserver.get('/api/resources', function (request, response) {
    ResourceModel.find({}, function (error, resources) {
        if (error) {
            response.send(error);
        } else {
            response.send(resources);
        }
    });
});

BucheWebserver.listen('42024');
