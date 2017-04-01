/* Buche
*/
"use strict";

const config = require('./buche_config.js');
const models = require('./buche_models.js');
const dgram = require('dgram');
const sleep = require('sleep');


function *all_resources() {
    const resources = yield models.Resources.all();
}


const pingMessage = Buffer.from('PING');

let port = 4097;
let host = '54.173.171.58';

function checkResource(resource) {

    let udpClient = dgram.createSocket('udp4');

    function checkResponse(msg, rinfo) {
        const expectedMessage = Buffer.from(resource.expected);
        console.log(`Response: ${msg}`);

        if (msg.equals(expectedMessage)) {
            console.log(`${resource.port}: ok`);
        } else {
            console.log(`${resource.port} fail`);
        }

        udpClient.close();
    }
    udpClient.on('message', checkResponse);

    udpClient.send(resource.message, 0, resource.message.length, resource.port, resource.host);
}

let i = 0;
while (true) {
    for (i = 8000; i < 8010; i++) {
        let resource = {
            id: 1,
            host: '54.173.171.58',
            port: i,
            message: 'PING',
            expected: 'PONG'
        }

        console.log(`checking ${resource.port}`);
        checkResource(resource);
        console.log('.');
    }
    sleep.sleep(10);
}
