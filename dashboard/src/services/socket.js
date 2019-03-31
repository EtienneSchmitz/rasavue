import store from "../store/index";
import VueSocketio from "vue-socket.io-extended";
import io from "socket.io-client";
import Vue from "vue";

Vue.use(VueSocketio, io("http://localhost:9000"), { store });
