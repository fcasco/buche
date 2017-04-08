/*jslint es6*/
const Express = require('express');
const db = require('./models.js');


let BucheWebserver = Express();

BucheWebserver.use(function (request, response, next) {
    console.log(request);
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

BucheWebserver.get('/api/resources', function (request, response) {
    console.log(request.route.path + '...');

    db.ResourceModel.find({}, function (error, resources) {
        if (error) {
            response.send(error);
            console.log('error');
        } else {
            response.send(resources);
            console.log('ok');
        }
    });
});

BucheWebserver.listen('42024');
console.log('Listening on http://localhost:42024 ...');
