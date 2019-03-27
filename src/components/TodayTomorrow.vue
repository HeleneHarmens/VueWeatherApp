<template>
  <div class="todayTomorrow">
    <h1>{{ title }}</h1>
    
    <div v-if="isLoading">
        <p>is loading...</p> 
    </div>

    <div v-else>
      
      <div id="card">
        <h4>Today, {{Today}}</h4>
        <table>
          <tr>
            <td><h5>Time</h5></td>
            <td><h5>Forecast</h5></td>
            <td><h5>Temp</h5></td>
            <td><h5>Wind</h5></td>
          </tr>
          <tr v-for="i in 20" :key="i" >
            <td v-if="String(lists[i].dt_txt).includes(String(Today))">
              <p>{{lists[i].dt_txt}}</p>
              </td>
            <td v-if="String(lists[i].dt_txt).includes(String(Today))">
              <p>{{lists[i].weather[0].main}}</p>
              </td>
            <td v-if="String(lists[i].dt_txt).includes(String(Today))">
              <p>{{lists[i].main.temp}}</p>
              </td>
            <td v-if="String(lists[i].dt_txt).includes(String(Today))">
              <p>{{lists[i].wind.speed}}</p>
              </td>
          </tr>
        </table>
      </div>

      <div id="card">
        <h4>Tomorrow, {{Tomorrow}}</h4>
        <table>
          <tr>
            <td><h5>Time</h5></td>
            <td><h5>Forecast</h5></td>
            <td><h5>Temp</h5></td>
            <td><h5>Wind</h5></td>
          </tr>
          <tr v-for="i in 20" :key="i" >
            <td v-if="String(lists[i].dt_txt).includes(String(Tomorrow))">
              <p>{{lists[i].dt_txt}}</p></td>
            <td v-if="String(lists[i].dt_txt).includes(String(Tomorrow))">
              <p>{{lists[i].weather[0].main}}</p></td>
            <td v-if="String(lists[i].dt_txt).includes(String(Tomorrow))">
              <p>{{lists[i].main.temp}}</p></td>
            <td v-if="String(lists[i].dt_txt).includes(String(Tomorrow))">
              <p>{{lists[i].wind.speed}}</p></td>
          </tr>
        </table>
      </div>    
    </div>

  </div>
</template>

<script>

export default {
  name: "todayTomorrow",
  data() {
    return {
      isLoading: false,
      title: "Today & Tomorrow",
      apiKey: "6796724a94f12b9b9b866a4d4b0794b2",
      chosenCity: "Oslo",
      units: "metric",
      info: [],
      lists: [],
      cities: [],
      Today: new Date(),
      Tomorrow: new Date()
    };  
  },

  created: function() {
    this.isLoading = true
    this.fetchItems();
    this.setToday();
    this.setTomorrow();
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
    },
    setToday() {
      this.Today = getToday(new Date())
    },
         
    setTomorrow() {
      this.Tomorrow = getTomorrow(new Date())
    }
  }
};

function getToday(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function getTomorrow(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate()+1),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
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
