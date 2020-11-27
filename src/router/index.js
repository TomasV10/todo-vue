import Vue from "vue";
import Router from "vue-router";
// import TodoList from "@/components/TodoList";
import App from "@/App";
import LandingPage from "@/components/marketing/LandingPage";
import Login from "@/components/auth/Login";
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
      component: App
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin
    }
  ],
  mode: "history"
});
