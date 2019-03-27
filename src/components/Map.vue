<template>
  <div class="myMap">
    <h1>{{ title }}</h1>
      <!--Links to alter map to go to those places-->
      <ul>
        <li>
          <a href="#/" @click="moveMap([59.91111, 10.75278])">Oslo</a>
        </li>
        <li>
          <a href="#/" @click="moveMap([63.4306, 10.3952])">Trondheim</a>
        </li>
        <li>
          <a href="#/" @click="moveMap([58.969975, 5.733107])">Stavanger</a>
        </li>
      </ul>
      <div id="mapid"></div>
    <div id="location">
    </div>
  </div>
</template>



<script>
import L from "leaflet";

//making variables
export default {
  name: "myMap",
  data() {
    return {
      title: "Weather Map",
      tickets: [],
      apiKey: "6796724a94f12b9b9b866a4d4b0794b2",
      chosenCity: "Oslo",
      units: "metric",
      info: [],
      lists: [],
      cities: [],
      leafletMap: null
    };
  },

  created: function() {
    this.fetchItems();
  },

  mounted() {
    this.initMap();
  },

  methods: {
    //gets info from api, add to variables
    fetchItems() {
      let uri =
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
        this.chosenCity +
        "&appid=" +
        this.apiKey +
        "&units=" +
        this.units;
      this.$http.get(uri, { responseType: "json" }).then(response => {
        this.info = response.data;
        (this.lists = response.data.list), (this.cities = response.data.city);
        //console.log("home.vue info: " + JSON.stringify(this.info));
      });
    },

// Get the map to appear on the page
    initMap() {
      this.leafletMap = L.map("mapid");
      this.leafletMap.setView([61, 8], 6);

      L.tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox.streets",
          accessToken:
            "pk.eyJ1IjoibGluZWFzIiwiYSI6ImNqdHBrd21icDAxaHI0NG41OGlwNm43bnoifQ.FX3CR_EALV1j7wC_1W4vkQ"
        }
      ).addTo(this.leafletMap);
    },

//links uses this method to setView
    moveMap(coord) {
      this.leafletMap.setView(coord, 8);
    }
  }
};
</script>

<!-- Some CSS to make pretty -->
<style>
.myMap {
 background-color: rgb(245, 176, 208);
 padding: 20px;
 box-shadow: 0 1px 5px 0 rgba(102, 15, 69, 0.2), 0 2px 20px 0 rgba(117, 22, 81, 0.2);
 
}

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
  margin: 0;
}

p {
  margin: 0;
}

#mapid {
  
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 40%;
  width: 40%;
  text-align: center;
  display: inline-block;
}
</style>

