/*jslint es6*/

const Mongoose = require('mongoose');
const config = require('./buche_config.js');


let ResourceSchema = new Mongoose.Schema({
    "_id": String,
    "name": String,
    "host": String,
    "port": Number,
    "send": String,
    "expect": String,
    "interval": Number,
    "email": String,
    "lastStatus": String,
    "lastResponseTime": Number,
    "lastCheck": Date
});

let ResourceModel = Mongoose.model('resource', ResourceSchema);
exports.Resource = ResourceModel;


let CheckSchema = new Mongoose.Schema({
    "_id": String,
    "resourceId": String,
    "datetime": Date,
    "status": String,
    "sent": String,
    "received": String,
    "responseTime": Number
});

let CheckModel = Mongoose.model('check', CheckSchema);
exports.Check = CheckModel;

let dbUrl = 'mongodb://' + config.db_settings['user']
          + ':' + config.db_settings['pass']
          + '@' + config.db_settings['host']
          + ':' + config.db_settings['port']
          + '/' + config.db_settings['name'];

Mongoose.connect(dbUrl);
