import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from "./route";
import store from "./store";
import VueGoogleCharts from "vue-google-charts";
import Notifications from "vue-notification";
import VueSocketIO from "vue-socket.io";


Vue.config.productionTip = false
Vue.use(VueGoogleCharts);
Vue.use(Notifications);
Vue.use(new VueSocketIO({
  debug: true,
  connection: "http://localhost:8089"
}))

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
