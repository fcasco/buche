/*jslint es6*/

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

exports.ResourceModel = ResourceModel;
