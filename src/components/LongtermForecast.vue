<template>
  <div class="longterm">
    <h1>{{ title }}</h1>
    
    <div v-if="isLoading">
        <p>is loading...</p> 
    </div>

    <div v-else>

      <br>
      <div id="card">
        <h4>longterm for</h4>
        <table>
          <tr>
            <td><h5>Time</h5></td>
            <td><h5>Forecast</h5></td>
            <td><h5>Temp</h5></td>
            <td><h5>Wind</h5></td>
          </tr>
          <tr v-for="i in 10" :key="i">
            <td> <p>{{lists[i].dt_txt}}</p></td>
            <td><p>{{lists[i].weather[0].main}}</p></td>
            <td><p>{{lists[i].main.temp}}</p></td>
            <td><p>{{lists[i].wind.speed}}</p></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "longterm",
  data() {
    return {
      isLoading: false,
      title: "Long-term",
      apiKey: "6796724a94f12b9b9b866a4d4b0794b2",
      chosenCity: "Oslo",
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
