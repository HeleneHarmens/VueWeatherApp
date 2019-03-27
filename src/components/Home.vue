<template>
  <div class="home">
    <h1>{{ title }}</h1>
    
    <div v-if="isLoading">
        <p>is loading...</p> 
    </div>

    <div v-else>
      <div id="info">
        <h2>{{cities.name}}</h2>
        <p><strong>Day:</strong> {{lists[1].dt_txt}}</p>
        <p><strong>Temperature:</strong> {{lists[1].main.temp}}</p>
        <p><strong>Humidity:</strong> {{lists[1].main.humidity}}</p>
        <p><strong>Weather:</strong> {{lists[1].weather[0].main}}</p>
        <br>
        <p><strong>Check todays weather for another city!</strong></p>
        <a href="#" @click="fetchItems(chosenCity = 'oslo')">Oslo</a>
        <a href="#" @click="fetchItems(chosenCity = 'trondheim')">Trondheim</a>
        <a href="#" @click="fetchItems(chosenCity = 'stavanger' )">Stavanger</a>
    
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      isLoading: false,
      title: "Home",
      apiKey: "6796724a94f12b9b9b866a4d4b0794b2",
      chosenCity: "Trondheim",
      units: "metric",
      info: [],
      lists: [],
      cities: [],
    };
  },

  created: function() {
    this.isLoading = true
    this.fetchItems();
  },

  methods: {
    fetchItems() {
      let uri =
        "http://api.openweathermap.org/data/2.5/forecast?q="+this.chosenCity+"&appid="+this.apiKey+"&units="+this.units;
      this.$http.get(uri, { responseType: "json" }).then(response => {
        this.info = response.data;
        (this.lists = response.data.list), 
        (this.cities = response.data.city);
        this.isLoading = false;
        //console.log("home.vue info: " + JSON.stringify(this.info));
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
}

ul {
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495e;
}

ul {
  padding: 5px;
}

li {
  list-style-type: none;
}

table {
  border-collapse: separate;
}

td {
  width: 100px;
}

th {
  text-align: left;
  float: left;
  padding: 20px 0;
}

#card {
  background-color: beige;
  text-align: center;
  display: inline-block;

}

#info {
  margin:0;
}

p { 
  margin:0;
}

</style>
