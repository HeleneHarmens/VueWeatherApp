<template>
  <div class="home">
    <h1>{{ title }}</h1>
    
    <div id="info">
      <h2>{{cities.name}}</h2>
      <p><strong>Day:</strong> {{lists[1].dt_txt}}</p>
      <p><strong>Temperature:</strong> {{lists[1].main.temp}}</p>
      <p><strong>Humidity:</strong> {{lists[1].main.humidity}}</p>
      <p><strong>Weather:</strong> {{lists[1].weather[0].main}}</p>
      <br>
    </div>

    <div id="card">
      <h4>Today, {{lists[0].dt_txt}}</h4>
      <table>
        <tr>
          <td><h5>Time</h5></td>
          <td><h5>Forecast</h5></td>
          <td><h5>Temp</h5></td>
          <td><h5>Wind</h5></td>
        </tr>
        <tr>
          <td><p>{{lists[0].dt_txt}}</p></td>
          <td><p>{{lists[0].weather[0].main}}</p></td>
          <td><p>{{lists[0].main.temp}}</p></td>
          <td><p>{{lists[0].wind.speed}}</p></td>
        </tr>
        <tr>
          <td><p>{{lists[1].dt_txt}}</p></td>
          <td><p>{{lists[1].weather[0].main}}</p></td>
          <td><p>{{lists[1].main.temp}}</p></td>
          <td><p>{{lists[1].wind.speed}}</p></td>
        </tr>
        <tr>
          <td><p>{{lists[2].dt_txt}}</p></td>
          <td><p>{{lists[2].weather[0].main}}</p></td>
          <td><p>{{lists[2].main.temp}}</p></td>
          <td><p>{{lists[2].wind.speed}}</p></td>
        </tr>
        <tr>
          <td><p>{{lists[3].dt_txt}}</p></td>
          <td><p>{{lists[3].weather[0].main}}</p></td>
          <td><p>{{lists[3].main.temp}}</p></td>
          <td><p>{{lists[3].wind.speed}}</p></td>
        </tr>
      </table>
    </div>

        <div id="card">
      <h4>Tomorrow, {{lists[8].dt_txt}}</h4>
      <table>
        <tr>
          <td><h5>Time</h5></td>
          <td><h5>Forecast</h5></td>
          <td><h5>Temp</h5></td>
          <td><h5>Wind</h5></td>
        </tr>
        <tr>
          <td> <p>{{lists[8].dt_txt}}</p></td>
          <td><p>{{lists[8].weather[0].main}}</p></td>
          <td><p>{{lists[8].main.temp}}</p></td>
          <td><p>{{lists[8].wind.speed}}</p></td>
        </tr>
        <tr>
          <td> <p>{{lists[9].dt_txt}}</p></td>
          <td><p>{{lists[9].weather[0].main}}</p></td>
          <td><p>{{lists[9].main.temp}}</p></td>
          <td><p>{{lists[9].wind.speed}}</p></td>
        </tr>
        <tr>
          <td> <p>{{lists[10].dt_txt}}</p></td>
          <td><p>{{lists[10].weather[0].main}}</p></td>
          <td><p>{{lists[10].main.temp}}</p></td>
          <td><p>{{lists[10].wind.speed}}</p></td>
        </tr>
        <tr>
          <td> <p>{{lists[10].dt_txt}}</p></td>
          <td><p>{{lists[10].weather[0].main}}</p></td>
          <td><p>{{lists[10].main.temp}}</p></td>
          <td><p>{{lists[10].wind.speed}}</p></td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      title: "Weather App",
      tickets: [],
      apiKey: "6796724a94f12b9b9b866a4d4b0794b2",
      chosenCity: "Oslo",
      units: "metric",
      info: [],
      lists: [],
      cities: [],
    };
  },

  created: function() {
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
