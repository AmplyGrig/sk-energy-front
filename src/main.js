import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios'
import Vuelidate from 'vuelidate'
import VueSimpleAlert from "vue-simple-alert";

axios.defaults.baseURL = 'http://185.22.63.196:2112';


Vue.config.productionTip = false;
Vue.use(Vuelidate)
Vue.use(VueSimpleAlert)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
