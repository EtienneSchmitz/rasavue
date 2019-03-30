import store from "../store/index";
import VueSocketIO from 'vue-socket.io';
import Vue from "vue";


Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:9000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}));