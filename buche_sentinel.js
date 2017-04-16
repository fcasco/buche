/* Buche Sentinel
*/
/*jslint es6 */
"use strict";

const Dgram = require('dgram');
const Mongodb = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const config = require('./buche_config.js');
const models = require('./models.js');

let Sentinel = {};

Sentinel.dbUrl = 'mongodb://' + config.db_settings['user']
               + ':' + config.db_settings['pass']
               + '@' + config.db_settings['host']
               + ':' + config.db_settings['port']
               + '/' + config.db_settings['name'];


// Conectar con la base de datos
Sentinel.getDb = function getDb(callback) {

    if (Sentinel.db) {
        callback(Sentinel.db);
    } else {
        Mongodb.MongoClient.connect(Sentinel.dbUrl, function (error, db) {
            assert.equal(error, null);

            console.log(`Connected to ${Sentinel.dbUrl}`);

            Sentinel.db = db;

            callback(db);
        });
    }
};

// Registrar el inicio de la verificacion
Sentinel.saveCheck = function saveCheck(resource) {

    let check = {
        "resourceId": resource._id,
        "datetime": new Date,
        "status": "w",
        "sent": resource.send,
        "received": null,
        "responseTime": 0
    };


    Sentinel.getDb(function (db) {
        let resourcesCollection = db.collection('resources');
        let checksCollection = db.collection('checks');

        checksCollection.insertOne(check);
        resourcesCollection.update({"_id": resource._id},
                                   {"$set": {"lastStatus": "w"}});

    });
};


// Guardar el resultado de la verificacion
Sentinel.updateCheck = function updateCheck(resource, data) {

    Sentinel.getDb(function (db) {
        let checksCollection = db.collection('checks');

        let checkCursor = checksCollection.find({"resourceId": Mongodb.ObjectId(resource._id),
                                                 "received": null})
                                          .sort({"datetime": 1})
                                          .limit(1);

        checkCursor.toArray(function (err, results) {
            let resourcesCollection = db.collection('resources');
            let checksCollection = db.collection('checks');
            let lastCheck = results[0];
            let responseTime = data.datetime - lastCheck.datetime;

            resourcesCollection.update({"_id": resource._id},
                                       {"$set": {
                                           "lastStatus": data.status,
                                           "lastResponseTime": responseTime
                                       }});

            checksCollection.update({"_id": lastCheck._id},
                                    {"$set": {
                                        "status": data.status,
                                        "responseTime": responseTime,
                                        "received": data.received
                                    }});
            }
        );

    });
};

// Verificar la respuesta de un recurso de red
Sentinel.checkResource = function checkResource(resource) {

    let udpClient = Dgram.createSocket('udp4');
    let toSend = Buffer.from(resource.send);
    let check;

    function checkResponse(msg, rinfo) {
        const expectedMessage = Buffer.from(resource.expect);
        let data = {};
        data["datetime"] = new Date;
        data["received"] = msg;

        if (msg.equals(expectedMessage)) {
            console.log(`${resource.port}: ok`);

            data["status"] = "o";
        } else {
            console.log(`${resource.port} fail`);

            data["status"] = "f";
        }

        udpClient.close();

        Sentinel.updateCheck(resource, data);
    }

    udpClient.on('message', checkResponse);

    console.log(`Sending "${resource.send}" to ${resource.host}:${resource.port}`);

    Sentinel.saveCheck(resource);
    udpClient.send(toSend, 0, toSend.length, resource.port, resource.host);
};


// Verificar la respuesta de los recursos
Sentinel.checkResources = function checkResources(resources, callback) {
    let resourcesLength = resources.length;
    let i;

    console.log('Checking resources...');

    for (i = 0; i < resourcesLength; i++) {
        Sentinel.checkResource(resources[i]);
    }

    callback(resources);
};


// Buscar todos los recursos que deben ser verificados
Sentinel.getResources = function getResources(callback) {
    console.log('Getting resources...');

    Sentinel.getDb(function (db) {
        let resourcesCollection = db.collection('resources');

        resourcesCollection.find({}).toArray(function (error, resources) {
            assert.equal(error, null);

            callback(resources);
        });
    });
};


// Iniciar la verificacion de recursos
Sentinel.run = function run() {

    console.log('Checking resources...');

    Sentinel.getDb(function (db) {
        Sentinel.getResources(function (resources) {
            Sentinel.checkResources(resources, function (resources) {
                // this.db.close();
            });
        });
    })

    setTimeout(Sentinel.run, 10000);
};


Sentinel.run();
