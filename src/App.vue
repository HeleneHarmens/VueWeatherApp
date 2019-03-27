<template>
  <div id="app">
    <!-- header -->
    <header>
      <span>Weather App - Line & Helene</span>
    </header>
    <main> 
      <!-- components -->
      <router-view></router-view>
      <myMap></myMap>
      <todayTomorrow></todayTomorrow>
      <longterm></longterm>
    </main>
    <!-- footer -->
    <footer><span>Task 28 Weather app - by Line & Helene</span></footer>
  </div>
</template>

<script>
import todayTomorrow from './components/TodayTomorrow.vue'
import longterm from './components/LongtermForecast.vue'
import myMap from './components/Map.vue'

export default {
  name: 'app',
  components: {
    todayTomorrow,
    longterm,
    myMap
  }
}
</script>

<!-- CSS -->
<style>

h1 {
  font-weight: bold;
}

body {
  margin: 0;
  background-color: rgb(236, 144, 187);
}

ul {
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: darkblue;
  text-decoration:underline;
  font-weight:600;
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

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#card {
  background-color: rgb(243, 229, 235);
  text-align: center;
  display: inline-block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: rgb(209, 82, 141);
  color: #ffffff;
  box-shadow: 0 1px 5px 0 rgba(73, 5, 47, 0.2), 0 6px 20px 0 rgba(114, 8, 73, 0.2);
}


header span {
  display: block;
  position: relative;
  font-size: 1.2em;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
  font-style: oblique;
}

footer {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: rgb(209, 82, 141);
  color: #ffffff;
  box-shadow: 0 1px 5px 0 rgba(73, 5, 47, 0.2), 0 6px 20px 0 rgba(114, 8, 73, 0.2);
}

footer span {
  display: block;
  position: relative;
  font-size: 0.9em;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
  text-align: right;
  font-family: monospace;
}

</style>
