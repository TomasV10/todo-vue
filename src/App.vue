<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" />
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
</style>
