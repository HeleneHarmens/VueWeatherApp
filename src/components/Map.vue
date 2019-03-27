<template>
  <div class="myMap">
    <h1>{{ title }}</h1>
    <div id="mapid" ref="mapElement"></div>
    <div id="location">
      <ul>
        <li>
          <a href="#" onClick="mymap.setView([58.969975, 5.733107],8)">Stavanger</a>
        </li>
        <li>
          <a href="#" onClick="mymap.setView([59.91111, 10.75278],8)">Oslo</a>
        </li>
        <li>
          <a href="#" onClick="mymap.setView([63.4306, 10.3952],8)">Trondheim</a>
        </li>
      </ul>
    </div>
  </div>
</template>



<script>
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
    },

  
  
  mounted () {
    const L = require ("leaflet");
    var mymap = L.map(this.$refs['mapElement']).setView([61, 8], 13);

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
      ).addTo(mymap);

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
  margin: 0;
}

p {
  margin: 0;
}

#mapid {
        height: 500px;
        width: 500px;
      }
</style>
