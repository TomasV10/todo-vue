import Vue from "vue";
import Router from "vue-router";
import App from "@/App";
import LandingPage from "@/components/marketing/LandingPage";
import Login from "@/components/auth/Login";
import Logout from "@/components/auth/Logout";
import Register from "@/components/auth/Register";
import Admin from "@/components/layouts/Admin";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "LandingPage",
      component: LandingPage
    },
    {
      path: "/todolist",
      name: "todolist",
      component: App,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        visitor: true
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        visitor: true
      }
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin
    }
  ],
  mode: "history"
});
