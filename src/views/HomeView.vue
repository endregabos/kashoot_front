<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Hello, User!
        </h1>
      </v-col>
    </v-row>

    <v-row class="text-justify">
      <v-col class="mb-4">
        <h2> 
            Profile Section
        </h2>
      </v-col>
      <v-col class="mb-4">
        <h2> 
            My total points: 
        </h2>
      </v-col>
      <v-col class="mb-4">
        <h2> 
            <v-text-field v-model="finale_score" readonly required></v-text-field> 
        </h2>
      </v-col>
    </v-row>

    <v-btn color="#9FA8DA" class="mr-4" @click="getPlayerGames">
        See My Games
    </v-btn>

    <v-simple-table fixed-header height="200px">
        <template v-slot:default>
            <thead>
          <tr>
            <th class="text-left">Game Id</th>
            <th class="text-left">Game Date</th>
            <th class="text-left">Gained Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item2 in games" :key="item2.game_id">
            <td>{{ item2.game_id }}</td>
            <td>{{ item2.round_id.date }}</td>
            <td>{{ item2.gained_points }}</td>
          </tr>
        </tbody>
        </template>
    </v-simple-table>

    <v-row class="text-justify">
      <v-col class="mb-4">
        <h2> 
        </h2>
      </v-col>
    </v-row>

    <v-row class="text-justify">
      <v-col class="mb-4">
        <h2> 
            Game Section
        </h2>
      </v-col>
    </v-row>

    <v-btn color="#9FA8DA" class="mr-4" @click="findAllCategories">
        See Categories
    </v-btn>

     <v-btn color="#9FA8DA" class="mr-4" @click="startGame">
        Start Game
    </v-btn>

    <v-text-field v-model="category_id" label="Category Id" required></v-text-field>

    <v-simple-table fixed-header height="200px">
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

  </v-container>
</template>

<script>
  import axios from "axios";
  import * as SockJS from 'sockjs-client';
  import * as Stomp from 'stompjs';  

  export default {
      name: 'HomePanel',
    data () {
      return {
          category_id: "",

          category: [],
          games: [],
          points: [],

          finale_score: 0,
      }
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
    async getPlayerGames() {
      try {
          var player_games = await axios.get("http://localhost:8080/api/playergames/user/" + window.localStorage.getItem("user_id"));
          
          this.games = player_games.data;
          this.games.round_id = player_games.data.date;
          

          var game = player_games.data;
          var sum = 0;
          game.forEach(i => {
                sum = sum + i.gained_points;
            });
          this.finale_score = sum;

      } catch (e) {
          alert("Eroare");
      }
        //console.log(window.localStorage.getItem("user_id"));
        //console.log(window.localStorage.getItem("user_name"));
    },
    async startGame() {
      try {
          var ch_category = await axios.get("http://localhost:8080/api/category/" + this.category_id);
          
          window.localStorage.setItem("ch_categ", ch_category.data.category_id);
          window.localStorage.setItem("ch_categ_name", ch_category.data.category_title);


          if(this.category_id == ""){
              alert("Eroare - nu ai selectat o categorie!");
          }
          else{
                // add new game-round
                var formatted_date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
                var newGameRound = await axios.post("http://localhost:8080/api/gameround", {
                    category_id: ch_category.data,
                    date: formatted_date,
                }); 
                
                window.localStorage.setItem("idRound", newGameRound.data.round_id);

              this.$router.push({ name: "GamePanel" });
          }
      } catch (e) {
          alert("Eroare - categoria nu exista!");
      }

    //  console.log("Chosen category id: " + window.localStorage.getItem("ch_categ"));
    //  console.log("User id: " + window.localStorage.getItem("user_id"));
    //  console.log("Round id: " + window.localStorage.getItem("idRound"));
    },
  },

    mounted() {
      var socket = new SockJS("http://localhost:8080/gs-websockets");
      var stompClient = Stomp.over(socket);
      stompClient.connect({}, frame => {
        stompClient.subscribe("/websockets", message => {
            alert(message.body);
        });
      });
    }

  }
</script>