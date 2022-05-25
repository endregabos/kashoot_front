<template>
  <v-form ref="form" class="ml-6 mr-6">
      <v-col class="mt-5 mb-5">
        <h2 class="display-1 font-weight-bold">
          Manage Categories
        </h2>
      </v-col>

    <v-text-field v-model="category_id" label="Category Id" required></v-text-field>

    <v-text-field v-model="category_title" label="Category Title" required></v-text-field>

    <v-btn color="success" class="mr-4" @click="findAllCategories">
      Find All Categories
    </v-btn>

     <v-btn color="success" class="mr-4" @click="addCategory"> 
        Add New Category 
    </v-btn>

    <v-btn color="success" class="mr-4" @click="editCategory"> 
        Edit Category 
    </v-btn>

    <v-btn color="error" class="mr-4" @click="deleteCategory"> 
        Delete Category 
    </v-btn>

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Category Id</th>
            <th class="text-left">Category Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in category" :key="item.category_id">
            <td>{{ item.category_id }}</td>
            <td>{{ item.category_title }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-form>
</template>


<script>
import axios from "axios";
export default {
  name: 'AdminCategoryPanel',  
  data() {
    return {
      category_id: "",
      category_title: "",
      category: [],
    };
  },
  methods: {
    async findAllCategories() {
      try {
          var category = await axios.get("http://localhost:8080/api/category");
          this.category = category.data;
      } catch (e) {
          alert("Eroare");
      }
    },
    async addCategory() {
      try {
          var category = await axios.post("http://localhost:8080/api/category", {
            category_title: this.category_title,
          });
        //window.localStorage.setItem("id", users.data.id);
      } catch (e) {
          alert("Eroare");
      }
    },
    async editCategory() {
      try {
          var category = await axios.put("http://localhost:8080/api/category/" + this.category_id, {
            category_id: this.category_id,
            category_title: this.category_title,
          });
        //window.localStorage.setItem("id", users.data.id);
      } catch (e) {
          alert("Eroare");
      }
    },
    async deleteCategory() {
      try {
          var category = await axios.delete("http://localhost:8080/api/category/"  +this.category_id);
        //window.localStorage.setItem("id", users.data.id);
      } catch (e) {
          alert("Eroare");
      }
    },
  },
};
</script>