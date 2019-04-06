import {Socket} from "socket.io";
import lang from "./classificationEndpoint";

/*
 * All socket send on the user during the first connection of the users.
 */
export function init(socket : Socket) {
    lang.getLangs(socket);
}

/*
 * Create all listen event for the socket.
 */
export function socket_listener (socket : Socket) {

    /**
     * TODO add an error when the category is not set.
     */
    socket.on("add lang", (data) => {
        lang.addLang(data, socket);
    });

    /**
     * TODO add an error when the category is not set.
     */
    socket.on("add category", (id_number, data) => {
        lang.addCategory(socket, id_number, data);
    });
}