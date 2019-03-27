<template>
  <div id="todayTomorrow" class="todayTomorrow">

    <!-- if/while item's not fetched -->
    <div v-if="isLoading">
        <p>is loading...</p> 
    </div>

    <!-- after item's fetched -->
    <div v-else>

      <!-- Display on webpage -->
      <h1>{{ title }}</h1>

      <h3>{{chosenCity}}</h3>
      <!-- Links to cities to display -->
      <p><strong>Check todays and tomorrows weather for another city: </strong></p>
        <ul>
          <li><a href="#/" @click="fetchItems(chosenCity = 'Oslo')">Oslo</a></li>
          <li><a href="#/" @click="fetchItems(chosenCity = 'Trondheim')">Trondheim</a></li>
          <li><a href="#/" @click="fetchItems(chosenCity = 'Stavanger' )">Stavanger</a></li>
        </ul>
      
      <!-- Forecast card TODAY -->
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
            <td v-if="String(lists[i-1].dt_txt).includes(String(Today))">
              <p>{{lists[i-1].dt_txt.substring(10,16)}}</p>
              </td>
            <td v-if="String(lists[i-1].dt_txt).includes(String(Today))">

              <img v-bind:src="'http://openweathermap.org/img/w/'+ 
                    lists[i].weather[0].icon.replace('01n', '01d')+'.png'">

              <p id="weatherDesc">{{lists[i-1].weather[0].description}}</p>
              <!--<font-awesome-icon v-bind:icon="Clouds" />-->
              </td>
            <td v-if="String(lists[i-1].dt_txt).includes(String(Today))">
              <p>{{lists[i-1].main.temp}}°</p>
              </td>
            <td v-if="String(lists[i-1].dt_txt).includes(String(Today))">
              <p>{{lists[i-1].wind.speed}}</p>
              </td>
          </tr>
        </table>
      </div>
      <br><br>

      <!-- Forecast card TOMORROW -->
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
            <td v-if="String(lists[i-1].dt_txt).includes(String(Tomorrow))">
              <p>{{lists[i-1].dt_txt.substring(10,16)}}</p></td>
            <td v-if="String(lists[i-1].dt_txt).includes(String(Tomorrow))">

                <img v-bind:src="'http://openweathermap.org/img/w/'+ 
                    lists[i].weather[0].icon.replace('01n', '01d')+'.png'">
                
                <p id="weatherDesc">{{lists[i-1].weather[0].description}}</p>
                <!--<font-awesome-icon v-bind:icon="String(Clouds)" />-->
              </td>
            <td v-if="String(lists[i-1].dt_txt).includes(String(Tomorrow))">
              <p>{{lists[i-1].main.temp}}°</p></td>
            <td v-if="String(lists[i-1].dt_txt).includes(String(Tomorrow))">
              <p>{{lists[i-1].wind.speed}}</p></td>
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
      chosenCity: "Trondheim",
      units: "metric",
      info: [],
      lists: [],
      cities: [],
      Today: new Date(),
      Tomorrow: new Date()
    };  
  },
/* Called synchronously after the instance is created */
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

function getIcon() {
  // <font-awesome-icon icon="cloud" />
  //if(weather === 'Clouds') {
    return "cloud";
  //}
}



</script>

<!-- CSS -->
<style>
h1,
h2 {
  font-weight: normal;
}

#todayTomorrow {
  padding: 20px;
}

#weatherDesc {
  font-style: oblique;
  font-size: 0.8em;
}

#card {
  background-color: rgb(243, 178, 208);
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
