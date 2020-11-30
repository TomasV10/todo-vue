<template>
  <div id="app" class="container">
    <img
      src="https://ps.w.org/dashboard-to-do-list/assets/icon-256x256.jpg?rev=1809858"
    />
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from "./components/TodoList";

export default {
  name: "App",
  components: {
    TodoList
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
.container {
  max-width: 600px;
  margin: 0 auto;
}
img {
  border-radius: 6px;
}
</style>
