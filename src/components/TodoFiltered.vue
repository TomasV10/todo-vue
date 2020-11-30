<template>
  <div>
    <button :class="{ active: filter == 'all' }" @click="changeFilter('all')">
      All
    </button>
    <button
      class="toDo"
      :class="{ active: filter == 'active' }"
      @click="changeFilter('active')"
    >
      To Do
    </button>
    <button
      class="completed"
      :class="{ active: filter == 'completed' }"
      @click="changeFilter('completed')"
    >
      Completed
    </button>
    <button
      class="progress"
      :class="{ active: filter == 'inProgress' }"
      @click="changeFilter('inProgress')"
    >
      In Progress
    </button>
  </div>
</template>
<script>
export default {
  name: "todo-filtered",
  computed: {
    filter() {
      return this.$store.state.filter;
    }
  },
  methods: {
    changeFilter(filter) {
      this.$store.dispatch("updateFilter", filter);
    }
  }
};
</script>

<style scoped>
.toDo {
  background-color: rgb(255, 0, 0);
  font-weight: 700;
  border-radius: 6px;
}
.completed {
  background-color: rgb(102, 255, 51);
  font-weight: 700;
  border-radius: 6px;
}
.progress {
  background-color: yellow;
  font-weight: 700;
  border-radius: 6px;
}
</style>
