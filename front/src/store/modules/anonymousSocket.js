const socketModule = {
    state : {
      currentConnectUserCount : {},

    },
    mutations : {
      set_current_user_count(state, data){
        state.currentConnectUserCount = data;
      },
    },

    getters : {
      get_current_user_count(state){
        return state.currentConnectUserCount;
      },
    },

    actions : {
      current_user_count({commit}, data){
        commit('set_current_user_count', data);
      },
    }
}


export default socketModule