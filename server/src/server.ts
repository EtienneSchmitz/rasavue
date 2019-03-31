'use strict';

// Packages
import {Socket} from "socket.io";
import {Db, MongoClient} from "mongodb";
import assert from "assert";
const socket = require('socket.io');

// Constants
const url : string = 'mongodb://root:example@localhost:27017/?authMechanism=DEFAULT&authSource=admin';
const dbName : string = 'rasavue';

function run() {
    // Create a socket.
    console.log('The server listening to port 9000');
    // Connect to the database
    const client : MongoClient = new MongoClient(url);
    client.connect((err : Error) => {
            assert.strictEqual(null, err);

            const db: Db = client.db(dbName);

            const appSocket = new socket();
            appSocket.listen(9000);
            // Listen the socket
            appSocket.on('connection', function(socket : Socket) {

                socket.on("add lang", (data) => {
                    console.log('data: ' + data.test1);
                });

            });
    });
}

run();