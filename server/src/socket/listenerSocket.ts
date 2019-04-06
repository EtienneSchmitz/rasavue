import { Socket } from 'socket.io';
import lang from './classificationEndpoint';
import nlu from './nluEndpoint'

/*
 * All socket send on the user during the first connection of the users.
 */
export function init (socket: Socket) {
  lang.getLangs(socket);
}

/*
 * Create all listen event for the socket.
 */
export function socketListener (socket: Socket) {
  /**
   * TODO add an error when the category is not set.
   */
  socket.on('add lang', data => {
    lang.addLang(data, socket);
  });

  /**
   * TODO add an error when the category is not set.
   */
  socket.on('add category', (idNumber, data) => {
    lang.addCategory(socket, idNumber, data);
  });

  socket.on('add entity', (categoryId, type, data) => {
    nlu.createEntity(socket, categoryId, type, data);
  })

  socket.on('get entity', (categoryId) => {
    nlu.getEntityByCategoryId(socket,categoryId);
  })

  socket.on('error', function () {});
}
