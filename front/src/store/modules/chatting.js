

const chattingSocketModule = {
    state : {
      currentConnectUserData : [],

    },
    mutations : {
      set_current_user_data(state, data){
        state.currentConnectUserData = data;
      }
    },

    getters : {
      get_current_user_data(state){
        return state.currentConnectUserData;
      }
    },

    actions : {
      //현재 접속자 리스트 가져오기
      async current_user_data({commit}, data){
        commit('set_current_user_data', data);
      },
      
    }
}


export default chattingSocketModule;