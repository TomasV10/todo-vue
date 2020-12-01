<template>
  <div class="login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="login">
      <div v-if="error" class="server-error">{{ error }}</div>
      <div class="form-control">
        <label for="email">Email</label>
        <input
          type="email"
          name="username"
          id="username"
          class="login-input"
          v-model="username"
        />
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="login-input"
          v-model="password"
        />
      </div>
      <div class="form-control">
        <button type="submit" class="btn-submit">Login</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("retrieveToken", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.$router.push({ name: "todolist" });
        })
        .catch(error => {
          this.error = error.response.data;
          (this.username = ""), (this.password = "");
        });
    }
  }
};
</script>

<style scoped>
.server-error {
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  padding: 10px 10px;
  border-radius: 6px;
  background: rgba(255, 128, 128, 0.5);
}
</style>
