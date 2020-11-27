// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Master from "./components/layouts/Master";
import router from "./router/index";
import { store } from "./store/store";

// window.eventBus = new Vue();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store: store,
  router,
  components: { Master },
  template: "<Master/>"
});
