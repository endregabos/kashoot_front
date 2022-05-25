<template>
  <v-form ref="form" class="ml-6 mr-6">
      <v-col class="mt-5 mb-5">
        <h2 class="display-1 font-weight-bold">
          Manage Questions
        </h2>
      </v-col>

    <v-text-field v-model="question_id" label="Question Id" required></v-text-field>

    <v-text-field v-model="category_id" label="Category Id" required></v-text-field>

    <v-text-field v-model="question_name" label="Question" required></v-text-field>
    
    <v-text-field v-model="question_answer1" label="Answer 1" required></v-text-field>
    <v-text-field v-model="question_answer2" label="Answer 2" required></v-text-field>
    <v-text-field v-model="question_answer3" label="Answer 3" required></v-text-field>
    <v-text-field v-model="question_answer4" label="Answer 4" required></v-text-field>

    <v-text-field v-model="question_correct" label="Correct Answer" required></v-text-field>

    <v-btn color="success" class="mr-4" @click="findAllQuestions">
        Find All Questions
    </v-btn>

     <v-btn color="success" class="mr-4" @click="addNewQuestion"> 
        Add New Question 
    </v-btn>

    <v-btn color="success" class="mr-4" @click="editQuestion"> 
        Edit Question 
    </v-btn>

    <v-btn color="error" class="mr-4" @click="deleteQuestion"> 
        Delete Question 
    </v-btn>

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Question Id</th>  
            <th class="text-left">Category Id</th> 
            <th class="text-left">Question</th> 
            <th class="text-left">Answer 1</th> 
            <th class="text-left">Answer 2</th> 
            <th class="text-left">Answer 3</th> 
            <th class="text-left">Answer 4</th>
            <th class="text-left">Correct Answer</th>  
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in question" :key="item.question_id">
            <td>{{ item.question_id }}</td>
            <td>{{ item.category_id }}</td>
            <td>{{ item.question_name }}</td>
            <td>{{ item.question_answer1 }}</td>
            <td>{{ item.question_answer2 }}</td>
            <td>{{ item.question_answer3 }}</td>
            <td>{{ item.question_answer4 }}</td>
            <td>{{ item.question_correct }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  name: 'AdminQuestionPanel',  
  data() {
    return {
      question_id: "",  
      category_id: "",
      question_name: "",
      question_answer1: "",
      question_answer2: "",
      question_answer3: "",
      question_answer4: "",
      question_correct: "",
      
      question: [],
    };
  },
  methods: {
    async findAllQuestions() {
      try {
          var question = await axios.get("http://localhost:8080/api/question");
          this.question = question.data;
          this.question.category_id = question.data.category_id;
      } catch (e) {
          alert("Eroare");
      }
    },
    async addNewQuestion() {
      try {
        var category = await axios.get("http://localhost:8080/api/category/" + this.category_id);
        var question = await axios.post("http://localhost:8080/api/question", {
            category_id: category.data,
            question_name: this.question_name,
            question_answer1: this.question_answer1,
            question_answer2: this.question_answer2,
            question_answer3: this.question_answer3,
            question_answer4: this.question_answer4,
            question_correct: this.question_correct,
        });
        //console.log(category.data);
      } catch (e) {
          alert("Eroare");
      }
    },
    async editQuestion() {
      try {
        var category = await axios.get("http://localhost:8080/api/category/" + this.category_id);
        var question = await axios.put("http://localhost:8080/api/question/" + this.question_id, {
            question_id: this.question_id,
            category_id: category.data,
            question_name: this.question_name,
            question_answer1: this.question_answer1,
            question_answer2: this.question_answer2,
            question_answer3: this.question_answer3,
            question_answer4: this.question_answer4,
            question_correct: this.question_correct,
        });
        //console.log(category.data);
      } catch (e) {
          alert("Eroare");
      }
    },
    async deleteQuestion() {
      try {
          var question = await axios.delete("http://localhost:8080/api/question/" + this.question_id);
        //window.localStorage.setItem("id", users.data.id);
      } catch (e) {
          alert("Eroare");
      }
    },
  },
};
</script>