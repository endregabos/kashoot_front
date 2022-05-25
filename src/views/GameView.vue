<template>
  <v-container> 
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to the Game!
        </h1>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-1 font-weight-bold mb-3">
          Ai ales categoria: 
        </h1>
      </v-col>
      <v-col>
        <v-text-field v-model="category_id" readonly required></v-text-field>
      </v-col>
      <v-col>
          <v-btn color="#9FA8DA" class="mr-4" @click="attemptGame">
                Begin
            </v-btn>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col class="mb-4">
        <h2> 
            Raspunde cu atentie la urmatoarele intrebari. Mult succes!
        </h2>
      </v-col>
    </v-row>

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Question</th> 
            <th class="text-left">Answer 1</th> 
            <th class="text-left">Answer 2</th> 
            <th class="text-left">Answer 3</th> 
            <th class="text-left">Answer 4</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in question.slice(0, 2)" :key="item.question_id">
            <td>{{ item.question_name }}</td>
            <td>{{ item.question_answer1 }}</td>
            <td>{{ item.question_answer2 }}</td>
            <td>{{ item.question_answer3 }}</td>
            <td>{{ item.question_answer4 }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-row class="text-center">
      <v-col class="mb-4">
        <h2> 
        </h2>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col class="mb-4">
        <h2> 
            Raspuns intrebare 1: 
        </h2>
      </v-col>
      <v-col class="mb-4">
          <v-text-field v-model="answer_1" required></v-text-field>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col class="mb-4">
        <h2> 
            Raspuns intrebare 2: 
        </h2>
      </v-col>
      <v-col class="mb-4">
          <v-text-field v-model="answer_2" required></v-text-field>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
        </h1>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col class="mb-4">
          <v-btn color="success" class="mr-4" @click="submit">
            Submit
          </v-btn>
      </v-col>
      <v-col class="mb-4">
          <v-text-field v-model="finale_score" readonly required></v-text-field>
      </v-col>
      <v-col class="mb-4">
            <v-btn color="#9FA8DA" class="mr-4" @click="goHome">
                Go Back to Home
            </v-btn>      
        </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import axios from "axios";

  export default {
      name: 'GamePanel',
    data () {
      return {
          category_id: window.localStorage.getItem("ch_categ_name"),
          finale_score: "Scor: " + 0,
          question: [],

          answer_1: "",
          answer_2: "",
          score: 0,
      }
    },
    methods: {        
    async attemptGame(){
        //var score = 0;

        var questionList = await axios.get("http://localhost:8080/api/question/" + window.localStorage.getItem("ch_categ"));

        this.question = questionList.data;
        //this.question = getMultipleRandom(questionList.data, 1);

        //window.localStorage.setItem("roundScore", score);
    },
    async submit(){
        this.score = 0;
        window.localStorage.setItem("roundScore", 0);

        if(this.answer_1 == "" || this.answer_2 == ""){
            alert("Nu ai raspuns la toate intrebarile!");
        }else{
            if(this.answer_1 == this.question[0].question_correct){
                this.score = this.score + 10;
            }
            else{
                this.score = this.score - 10;
            }

            if(this.answer_2 == this.question[1].question_correct){
                this.score = this.score + 10;
            }
            else{
                this.score = this.score - 10;
            }
            window.localStorage.setItem("roundScore", this.score);
            this.finale_score= "Scor: " + window.localStorage.getItem("roundScore");

            try{
                var round = await axios.get("http://localhost:8080/api/gameround/" + window.localStorage.getItem("idRound"));
                var id = window.localStorage.getItem("user_id");
                var usr = await axios.get("http://localhost:8080/api/users/" + id);

                //console.log("User data: " + usr.data.user_id);

                var playerGame = await axios.post("http://localhost:8080/api/playergames", {
                    round_id: round.data,
                    userId: usr.data,
                    gained_points: window.localStorage.getItem("roundScore")
                });

            } catch(e){
                alert("Eroare");
            }
        }

        //console.log("User id: " + window.localStorage.getItem("user_id"));
        //console.log("Round id: " + window.localStorage.getItem("idRound"));
        //console.log("roundScore: " + window.localStorage.getItem("roundScore"));
    },
    async goHome(){
        this.$router.push({ name: "home" });
    },
  },
  }
</script>