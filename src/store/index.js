import Vue from "vue";
import Vuex from "vuex";
import auth from './modules/auth'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    headerItems: [
      { ref: "/home", text: "О компании" },
      { ref: "/energy", text: "Энергоконсалтинг" },
      { ref: "/blog", text: "Блог" },
      { ref: "/contact", text: "Контакты" }
    ]
  },
  mutations: {},
  actions: {},
  modules: {
    auth
  }
});