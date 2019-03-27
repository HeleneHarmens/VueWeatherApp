<template>
  <div id="longterm" class="longterm">

    <!-- if/while item's not fetched -->
    <div v-if="isLoading">
        <p>is loading...</p> 
    </div>

    <!-- after item's fetched -->
    <div v-else>

      <!-- Display on webpage -->
      <h1>{{ title }}</h1>
      <!-- Links to cities to display -->
      <p><strong>Check longterm weather for another city: </strong></p>
          <ul>
            <li><a href="#/" @click="fetchItems(chosenCity = 'Oslo')">Oslo</a></li>
            <li><a href="#/" @click="fetchItems(chosenCity = 'Trondheim')">Trondheim</a></li>
            <li><a href="#/" @click="fetchItems(chosenCity = 'Stavanger' )">Stavanger</a></li>
        </ul>
      <h3>{{chosenCity}}</h3>
        <br>
        <!-- Forecast card -->
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
              <td><p>{{lists[i].dt_txt.substring(0,10)}}</p></td>
              <td>
                <img v-bind:src="'http://openweathermap.org/img/w/'+ 
                      lists[i].weather[0].icon.replace('01n', '01d')+'.png'">
                <p id="weatherDesc">{{lists[i].weather[0].description}}</p>
              </td>
              <td><p>{{lists[i].main.temp}}°</p></td>
              <td><p>{{lists[i].wind.speed}}</p></td>
            </tr>
            <tr>
              <td><p>{{lists[39].dt_txt.substring(0,10)}}</p></td>
              <td>
                <img v-bind:src="'http://openweathermap.org/img/w/'+ 
                      lists[39].weather[0].icon.replace('01n', '01d')+'.png'">
                <p id="weatherDesc">{{lists[39].weather[0].description}}</p>
              </td>
              <td><p>{{lists[39].main.temp}}°</p></td>
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
      numbers: [ 0, 8, 16, 24, 32, 39]
    };
  },
  /* Called synchronously after the instance is created */
  created: function() {
    this.isLoading = true
    this.fetchItems();
    this.setToday();
    this.setTomorrow();
  },
  
// METHODS
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

#longterm{
  background-color: rgb(245, 176, 208);
  padding: 20px;
  box-shadow: 0 1px 5px 0 rgba(102, 15, 69, 0.2), 0 2px 20px 0 rgba(117, 22, 81, 0.2);
}

#weatherDesc {
  font-style: oblique;
  font-size: 0.8em;
}


#card {
  background-color: rgb(253, 196, 223);
  text-align: center;
  display: inline-block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#info {
  margin:0;
}

p { 
  margin:0;
}

</style>
