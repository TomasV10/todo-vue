<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit" />
      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="todo-item-label"
        :class="{ completed: completed }"
      >
        {{ title }}
      </div>
      <input
        v-else
        type="text"
        class="todo-item-edit"
        v-model="title"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.escape="cancelEdit"
        v-focus
      />
    </div>
    <div class="remove-item" @click="removeTodo(todo.id)">
      &times;
    </div>
  </div>
</template>
<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: ""
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  watch: {
    checkAll() {
      if (this.checkAll) {
        this.completed = true;
      } else this.completed = this.todo.completed;
    }
  },
  methods: {
    removeTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim() == "") {
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      this.$store.dispatch("updateTodo", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      });
    },
    cancelEdit() {
      this.editing = false;
      this.title = this.beforeEditCache;
    }
  }
};
</script>

<style scoped>
.todo-item-left {
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 26px;
  color: brown;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}
.todo-item-edit:focus {
  outline: none;
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
}
.remove-item:hover {
  color: red;
}

.completed {
  text-decoration: line-through;
  color: grey;
}
</style>
