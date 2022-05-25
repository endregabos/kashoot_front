<template>
  <v-form ref="form" class="ml-6 mr-6">
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Hello, Admin!
        </h1>
      </v-col>
    </v-row>
      <v-col class="mt-5 mb-5">
        <h2 class="display-1 font-weight-bold">
          Manage Users
        </h2>
      </v-col>

    <v-text-field v-model="id" label="User Id" required></v-text-field>

    <v-text-field v-model="name" label="User Name" required></v-text-field>

    <v-text-field v-model="password" label="Password" required></v-text-field>

    <v-text-field v-model="role" label="User Role" required></v-text-field>

    <v-btn color="success" class="mr-4" @click="findAllUsers">
      Find All Users
    </v-btn>

    <v-btn color="success" class="mr-4" @click="editUser"> 
        Edit User 
    </v-btn>

    <v-btn color="error" class="mr-4" @click="deleteUser"> 
        Delete User 
    </v-btn>

    <v-btn color="#9575CD" class="mr-4" @click="goToCategories"> 
        Manage Categories 
    </v-btn>

    <v-btn color="#26A69A" class="mr-4" @click="goToQuestions"> 
        Manage Questions 
    </v-btn>

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Id</th>
            <th class="text-left">User Name</th>
            <th class="text-left">User Password</th>
            <th class="text-left">User Is Admin</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users" :key="item.user_id">
            <td>{{ item.user_id }}</td>
            <td>{{ item.user_name }}</td>
            <td>{{ item.user_password }}</td>
            <td>{{ item.user_isAdmin }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  name: 'AdminPanel',  
  data() {
    return {
      id: "",
      name: "",
      password: "",
      role: "",
      users: [],
    };
  },
  methods: {
    async findAllUsers() {
      try {
          var users = await axios.get("http://localhost:8080/api/users");
          this.users = users.data.sort(function(a, b) {
            return parseFloat(a.user_id) - parseFloat(b.user_id);
            });;
          //window.localStorage.setItem("id", users.data.id);
      } catch (e) {
          alert("Eroare");
      }
    },
    async editUser() {
      try {
          var users = await axios.put("http://localhost:8080/api/users/"+this.id, {
            user_id: this.id,
            user_name: this.name,
            user_password: this.password,
            user_isAdmin: this.role,
          });
        //window.localStorage.setItem("id", users.data.id);
      } catch (e) {
          alert("Eroare");
      }
    },
    async deleteUser() {
      try {
          var users = await axios.delete("http://localhost:8080/api/users/"+this.id);
        //window.localStorage.setItem("id", users.data.id);
      } catch (e) {
          alert("Eroare");
      }
    },
    async goToCategories() {
      try {
          this.$router.push({ name: "AdminCategoryPanel" });
        //window.localStorage.setItem("id", users.data.id);
      } catch (e) {
          alert("Eroare");
      }
    },
    async goToQuestions() {
      try {
          this.$router.push({ name: "AdminQuestionPanel" });
        //window.localStorage.setItem("id", users.data.id);
      } catch (e) {
          alert("Eroare");
      }
    },
  },
};
</script>