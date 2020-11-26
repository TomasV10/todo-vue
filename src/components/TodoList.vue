<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      name="fade"
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutUp"
    >
      <todo-item
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="!anyRemaining"
      >
      </todo-item>
    </transition-group>
    <div class="extra-container">
      <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
      <todo-items-remaining :remaining="remaining"></todo-items-remaining>
    </div>
    <div class="extra-container">
      <todo-filtered @filterChanged="this.filter = filter"></todo-filtered>
      <div>
        <transition name="fade">
          <todo-clear-completed
            :showClearCompletedButton="showClearCompleteButton"
          ></todo-clear-completed>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoCheckAll from "./TodoCheckAll";
import TodoFiltered from "./TodoFiltered";
import TodoClearCompleted from "./TodoClearCompleted";
import TodoItem from "./TodoItem";
import TodoItemsRemaining from "./TodoItemsRemaining";
export default {
  name: "TodoList",
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
      beforeEditCache: "",
      filter: "all",
      todos: [
        {
          id: 1,
          title: "Tesssst",
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: "Tesssst222222",
          completed: false,
          editing: false
        }
      ]
    };
  },
  created() {
    eventBus.$on("removedTodo", index => this.removeTodo(index));
    eventBus.$on("finishedEdit", data => this.finishedEdit(data));
    eventBus.$on("checkAllChanged", checked => this.checkAllTodos(checked));
    eventBus.$on("filterChanged", filter => (this.filter = filter));
    eventBus.$on("clearCompletedTodos", () => this.clearCompleted());
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    todosFiltered() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter == "completed") {
        return this.todos.filter(todo => todo.completed);
      }
      return this.todos;
    },
    showClearCompleteButton() {
      return this.todos.filter(todo => todo.completed).length > 0;
    }
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false
      });
      this.newTodo = "";
      this.idForTodo++;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.todos.forEach(todo => (todo.completed = event.target.checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    finishedEdit(data) {
      this.todos.splice(data.index, 1, data.todo);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
}
.todo-input:focus {
  outline: 0;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}
.name-container {
  margin-bottom: 16px;
}
button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  padding: 4px;
}
button:hover {
  background: lightgreen;
}
button:focus {
  outline: none;
}
.active {
  background: lightgreen;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
