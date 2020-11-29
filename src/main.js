import Vue from "vue";
import Master from "./components/layouts/Master";
import router from "./router/index";
import { store } from "./store/store";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.visitor)) {
    if (store.getters.loggedIn) {
      next({
        path: "/todolist"
      });
    } else {
      next();
    }
  }
  {
    next();
  }
});

new Vue({
  el: "#app",
  store: store,
  router,
  components: { Master },
  template: "<Master/>"
});
