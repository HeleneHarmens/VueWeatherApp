// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: {
    results: [],
    apiKey: '6796724a94f12b9b9b866a4d4b0794b2',
    city: 'Oslo',
    units: 'metric',
    list: []
  },
  mounted() {
    axios.get('http://api.openweathermap.org/data/2.5/forecast?q='+this.city+'&appid='+this.apiKey+'&units='+this.units)
    .then(response => {
      this.results = response.data
      //console.log("mainjs results: "+JSON.stringify(this.results))
    })
  },
    
  created() {
      axios
      .get('http://api.openweathermap.org/data/2.5/forecast?q='+this.city+'&appid='+this.apiKey+'&units='+this.units)
      .then(response => (
          this.list = response.data.list
          //console.log("mainjs list: "+JSON.stringify(this.list))
          ))
      .catch(error => {
          console.log(error)
          this.errored = true
      })
  }


})