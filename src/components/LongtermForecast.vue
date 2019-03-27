<template>
  <div class="longterm">
    <h1>{{ title }}</h1>
    <p><strong>Check todays and tomorrows weather for another city: </strong></p>
        <ul>
          <li><a href="#/" @click="fetchItems(chosenCity = 'Oslo')">Oslo</a></li>
          <li><a href="#/" @click="fetchItems(chosenCity = 'Trondheim')">Trondheim</a></li>
          <li><a href="#/" @click="fetchItems(chosenCity = 'Stavanger' )">Stavanger</a></li>
      </ul>
    <h3>{{chosenCity}}</h3>

    <div v-if="isLoading">
        <p>is loading...</p> 
    </div>

    <div v-else>
      <p><strong>Check longterm weather for another city: </strong></p>
      <ul>
        <li><a href="#/" @click="fetchItems(chosenCity = 'oslo')">Oslo</a></li>
        <li><a href="#/" @click="fetchItems(chosenCity = 'trondheim')">Trondheim</a></li>
        <li><a href="#/" @click="fetchItems(chosenCity = 'stavanger' )">Stavanger</a></li>
      </ul>
      <br>
      <div id="card">
        <h4>Long-term Forecast</h4>
        <table>
          <tr>
            <td><h5>Day</h5></td>
            <td><h5>Forecast</h5></td>
            <td><h5>Temp</h5></td>
            <td><h5>Wind</h5></td>
          </tr>
          <tr v-for="i in everyNth(numbers)" :key="i" >
            <td><p>{{lists[i].dt_txt}}</p></td>
            <td><p>{{lists[i].weather[0].description}}</p><img src="http://openweathermap.org/img/w/02n.png"></td>
            <td><p>{{lists[i].main.temp}}</p></td>
            <td><p>{{lists[i].wind.speed}}</p></td>
          </tr>
          <tr>
            <td><p>{{lists[39].dt_txt}}</p></td>
            <td><p>{{lists[39].weather[0].description}}</p><img src="http://openweathermap.org/img/w/02n.png"></td>
            <td><p>{{lists[39].main.temp}}</p></td>
            <td><p>{{lists[39].wind.speed}}</p></td>
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
      Today: new Date(),
      Tomorrow: new Date(),
      numbers: [ 0, 8, 16, 24, 32, 39],
      icon: null
    };
  },
  created: function() {
    this.isLoading = true
    this.fetchItems();
    this.setToday();
    this.setTomorrow();
  },

  computed: {
    Clouds () { return "cloud"; },
    Clear () { return "sun"; },
    Rain () { return "cloud-rain"; },
    Snow () { return "snowflake"; }
  },

  
// METHODS
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
    },
    
    everyNth: function (numbers) {
      return numbers.filter(function (number) {
        return number % 2 === 0
      })
    }
  }
};

// FUNCTIONS
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

<!-- CSS -->
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
