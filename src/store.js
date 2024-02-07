import Vue from 'vue';
import Vuex from "vuex";


export const store = new Vuex.Store({
  state: {
    isAuthenticated: '',
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated = localStorage.getItem("user")?.length ? true : false;
    },
  },
});
