'use strict';

const Socket = require('socket.io');
const Endpoint = require('./endpoint');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://root:example@localhost:27017/?authMechanism=DEFAULT&authSource=admin';
const assert = require('assert');
const dbName = 'rasavue';

function run() {
    // Create a socket.
    const socket = new Socket();
    socket.listen(9000);
    console.log('The server listening to port 9000');
    // Connect to the database
    const client = new MongoClient(url);
    client.connect((err) => {
            assert.strictEqual(null, err);

            const db = client.db(dbName);

            // Create an endpoint for all socket
            // const endpoint = new Endpoint(socket,db);
            // Listen the socket
            socket.on('connection', function(socket) {
                console.log("connection");
                socket.on("add lang", (data) => {
                console.log('data: ' + data.test1);
                });

            });
    });
}

run();