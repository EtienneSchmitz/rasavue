"use strict";

// Packages
import { Socket } from "socket.io";
var mongoose = require("mongoose");
const SocketIO = require("socket.io");
import "./schemas/index";
import {init, socketListener} from "./socket/listenerSocket";

// Constants
const url: string =
  "mongodb://root:example@localhost/rasa_vue?authMechanism=DEFAULT&authSource=admin";

function run() {
  // Connect to the mongoDB database.
  mongoose
    .connect(url, { useNewUrlParser: true })
    .then(() => {
      console.log("MongoDB database connected");
    })
    .catch((err: Error) => {
      console.error("connection error");
      console.error(err);
      throw new Error("Stop the server");
    });

  // Create a socket.
  const app_socket = new SocketIO();
  app_socket.listen(9000);
  console.log("The server listening to port 9000");

  // Request cors
  app_socket.origins("*:*");

  app_socket.on("connection", (socket: Socket) => {
    init(socket);
    socketListener(socket);
  });
}

run();
