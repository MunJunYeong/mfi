import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth';
import idea from './idea';
import anonymous from './anonymous'
Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  //   ...auth.state
  // },
  // mutations: {
  //   ...auth.m
  // },
  // actions: {
  // },
  modules: {
    auth, idea, anonymous
  }
})
