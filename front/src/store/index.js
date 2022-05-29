import Vue from 'vue';
import Vuex from 'vuex'

import auth from './modules/auth';
import idea from './modules/idea';
import anonymous from './modules/anonymous'
import anonymousSocket from './modules/anonymousSocket'
import chatting from './modules/chatting'

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
    auth, idea, anonymous, anonymousSocket, chatting
  },
})
