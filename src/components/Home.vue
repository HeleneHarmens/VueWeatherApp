<template>
  <div id="home" class="home">
    
    <!-- if/while item's not fetched -->
    <div v-if="isLoading">
        <p>is loading...</p> 
    </div>

    <!-- after item's fetched -->
    <div v-else>

      <!-- Display on webpage -->
      <h1>{{ title }}</h1>

      <div id="info">
        <h2>{{cities.name}} now</h2>
         <img v-bind:src="'http://openweathermap.org/img/w/'+ 
                    lists[0].weather[0].icon.replace('01n', '01d')+'.png'">
        <p><strong>Day:</strong> {{lists[0].dt_txt.substring(0,10)}}</p>
        <p><strong>Temperature:</strong> {{lists[0].main.temp}}°</p>
        <p><strong>Humidity:</strong> {{lists[0].main.humidity}}</p>
        <p><strong>Weather:</strong> {{lists[0].weather[0].main}}</p>
        <br>
        <!-- Links to cities to display -->
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
      title: "Weather App",
      apiKey: "6796724a94f12b9b9b866a4d4b0794b2",
      chosenCity: "Trondheim",
      units: "metric",
      info: [],
      lists: [],
      cities: [],
    };
  },

  /* Called synchronously after the instance is created */
  created: function() {
    this.isLoading = true
    this.fetchItems();
  },

  methods: {
    /* Get stuff from api and save to variables declared above */
    fetchItems() {
      let uri =
        "http://api.openweathermap.org/data/2.5/forecast?q="+this.chosenCity+"&appid="+this.apiKey+"&units="+this.units;
      this.$http.get(uri, { responseType: "json" }).then(response => {
        this.info = response.data;
        (this.lists = response.data.list), 
        (this.cities = response.data.city);
        this.isLoading = false;
      });
    }
  }
};
</script>

<!-- CSS -->
<style>
h1,
h2 {
  font-weight: normal;
}

#home {
  padding: 20px;
  
}

ul {
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
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
  width: fit-content;
  margin:0;
  padding: 20px;
  text-align: center;
  display: inline-block;
  background-color: rgb(255, 193, 222);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

p { 
  margin:0;
}

</style>
