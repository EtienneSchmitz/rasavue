import Vue from "vue";
import "./services/plugins/vuetify";
import App from "./App.vue";
import router from "./services/router";
import "./services/socket";
import store from "./store/index";
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
