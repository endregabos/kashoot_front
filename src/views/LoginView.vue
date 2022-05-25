<template>
  <v-form
    ref="form"
    class="ml-6 mr-6"
  >
    <v-text-field
      v-model="name"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      required
    ></v-text-field>

    <v-btn
      color="success"
      class="mr-4"
      @click="login"
    >
      Login
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="$router.push({ name: 'register' })"
    >
      Register
    </v-btn>
  </v-form>
</template>

<script>
  import axios from "axios";
  export default {
    name: 'Login',
    data() {
      return {
        id: "",
        name: "",
        password: "",
      }
    },
    methods: {
      async login() {
        try {  
          var user = await axios.get("http://localhost:8080/api/login/" + this.name + "/" + this.password);
          
          window.localStorage.setItem("user_id", user.data.user_id);
          window.localStorage.setItem("user_name", user.data.user_name);
          window.localStorage.setItem("user_is_admin", user.data.user_isAdmin);

            if(window.localStorage.getItem("user_is_admin") == "true"){
                this.$router.push({ name: "AdminPanel" });
            }else{
                this.$router.push({ name: "home" });
            }
        } catch (e) {
          alert("Credentiale incorecte!");
        }

        //console.log(window.localStorage.getItem("user_id"));
        //console.log(window.localStorage.getItem("user_name"));
        //console.log(window.localStorage.getItem("user_is_admin"));
      }
    }
  }
</script>