import { Socket } from 'socket.io';
import lang from './classificationEndpoint';
import nlu from './nluEndpoint'
import {category} from "../schemas/classification";

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

  /**********************************************************************
   *                              Entity Socket                         *
   **********************************************************************/

  socket.on('create entity', async (categoryId, type, data) => {
    let result = nlu.createEntity(categoryId, type, data);

    if(result) {
      result.then(() => {
        socket.emit('success');
      }).catch(() => {
        socket.emit('server error', 'Problem to save the entity');
      });
    } else {
      socket.emit('server error','Problem to save the entity');
    }
  });

  socket.on('get entity', async (categoryId) => {
    let response = await nlu.getEntityByCategoryId(categoryId);

    if(response == null) {
      socket.emit('server error', "Error in the category Id or in the type entity.");
    } else {
      socket.emit("response entity", response);
    }
  });

  /**********************************************************************
   *                               Agent Socket                         *
   **********************************************************************/

  socket.on('add agent', (categoryId, agent) => {
    if(agent !== null && agent.name !== null && categoryId !== null) {
      let response = nlu.addAgent(categoryId, agent);
      if(response) {
        response.then(() => {
          socket.emit('success');
        }).catch((err) => {
          socket.emit('server error', 'Problem to save the agent');
        });
      }
    } else {
      socket.emit('server error','The data provided by this socket is not good');
    }
  });


  socket.on('get agent', async (categoryId) => {
    if(categoryId != null) {
      let result = await nlu.getAgentByCategoryId(categoryId);
      socket.emit('response agent', result);
    } else {
      socket.emit('server error','The data provided by this socket is not good');
    }
  });

  /**********************************************************************
   *                         Intent Socket                              *
   **********************************************************************/

  socket.on('add intent', (agentId, intent) => {
    if(intent !== null && intent.text !== null && agentId !== null) {
      let response = nlu.addIntent(agentId, intent);
      if(response) {
        response.then(() => {
          socket.emit('success');
        }).catch((err) => {
          socket.emit('server error', 'Problem to save the intent');
        });
      }
    } else {
      socket.emit('server error','The data provided by this socket is not good');
    }
  });


  socket.on('get intent', async (agentId) => {
    if(agentId != null) {
      let result = await nlu.getIntentByAgentId(agentId);
      socket.emit('response intent', result);
    } else {
      socket.emit('server error','The data provided by this socket is not good');
    }
  });

  /**********************************************************************
   *                          NLU Socket                                *
   **********************************************************************/

  socket.on('train nlu', () => {
    let isSucess : boolean = nlu.trainNLU();
    if(isSucess) {
      socket.emit('sucess');
    } else {
      socket.emit('server error');
    }
  });
}
