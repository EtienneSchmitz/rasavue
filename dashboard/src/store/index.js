import Vue from "vue";
import Vuex from "vuex";
import lang from "./modules/lang";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    lang
  }
});
