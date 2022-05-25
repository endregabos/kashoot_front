<template>
  <v-form ref="form" class="ml-6 mr-6">
    <v-text-field v-model="name" label="User Name" required></v-text-field>

    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      required
    ></v-text-field>

    <v-btn color="success" class="mr-4" @click="register"> Register </v-btn>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    async register() {  
      try {  
        var result = await axios.post("http://localhost:8080/api/users", {
          user_name: this.name,
          user_password: this.password,
          user_isAdmin: false,
        });

        window.localStorage.setItem("user_id", result.data.user_id);
        window.localStorage.setItem("user_name", result.data.user_name);

        this.$router.push({ name: "home" });
      } catch (e) {
          alert("Eroare!");
      }
        //console.log(window.localStorage.getItem("user_id"));
        //console.log(window.localStorage.getItem("user_name"));
    },
  },
};
</script>