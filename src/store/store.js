import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

axios.defaults.baseURL = "http://localhost/todo-laravel/api";

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem("access_token" || null),
    filter: "all",
    todos: [],
    users: []
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    todosFiltered(state) {
      if (state.filter == "all") {
        return state.todos;
      } else if (state.filter == "active") {
        return state.todos.filter(todo => !todo.completed);
      } else if (state.filter == "completed") {
        return state.todos.filter(todo => todo.completed);
      } else if (state.filter == "inProgress") {
        return state.todos.filter(todo => todo.inProgress);
      }
      return state.todos;
    },
    showClearCompleteButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    },
    loggedIn(state) {
      return state.token != null;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        inProgress: false,
        editing: false
      });
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        inProgress: todo.inProgress,
        editing: todo.editing
      });
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      state.todos.splice(index, 1);
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked));
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },

    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    retrieveTodos(state, todos) {
      state.todos = todos;
    },
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
    clearTodos(state) {
      state.todos = [];
    },
    retrieveUsers(state, users) {
      state.users = users;
    }
  },
  actions: {
    retrieveUsers(context) {
      axios
        .get("/userList")
        .then(response => {
          context.commit("retrieveUsers", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    retrieveName(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .get("/user")
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    clearTodos(context) {
      context.commit("clearTodos");
    },
    retrieveTodos(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      axios
        .get("/todos")
        .then(response => {
          context.commit("retrieveTodos", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    destroyToken(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios
            .post("/logout")
            .then(response => {
              localStorage.removeItem("access_token");
              context.commit("destroyToken");
              resolve(response);
            })
            .catch(error => {
              localStorage.removeItem("access_token");
              context.commit("destroyToken");
              reject(error);
            });
        });
      }
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/register", {
            name: data.name,
            email: data.email,
            password: data.password
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    addTodo(context, todo) {
      axios
        .post("/todos", {
          title: todo.title,
          completed: false,
          inProgress: false
        })
        .then(response => {
          context.commit("addTodo", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateTodo(context, todo) {
      axios
        .patch("/todos/" + todo.id, {
          title: todo.title,
          completed: todo.completed,
          inProgress: todo.inProgress
        })
        .then(response => {
          context.commit("updateTodo", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteTodo(context, id) {
      axios
        .delete("/todos/" + id)
        .then(() => {
          context.commit("deleteTodo", id);
        })
        .catch(error => {
          console.log(error);
        });
    },
    checkAll(context, checked) {
      axios
        .patch("/todosCheckAll", {
          completed: checked
        })
        .then(() => {
          context.commit("checkAll", checked);
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateFilter(context, filter) {
      context.commit("updateFilter", filter);
    },
    clearCompleted(context) {
      const completed = store.state.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id);
      axios
        .delete("/todosDeleteCompleted", {
          data: {
            todos: completed
          }
        })
        .then(() => {
          context.commit("clearCompleted");
        })
        .catch(error => {
          console.log(error);
        });
    },
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("/login", {
            username: credentials.username,
            password: credentials.password
          })
          .then(response => {
            const token = response.data.access_token;
            localStorage.setItem("access_token", token);
            context.commit("retrieveToken", token);
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    }
  }
});
