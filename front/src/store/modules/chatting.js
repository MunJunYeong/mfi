

const chattingSocketModule = {
    state : {
      currentConnectUserData : [],
      chattingFlag : false,
    },
    mutations : {
      set_current_user_data(state, data){
        state.currentConnectUserData = data;
      },
      set_start_chatting_flag(state, flag){
        state.chattingFlag = flag;
      },
    },

    getters : {
      get_current_user_data(state){
        return state.currentConnectUserData;
      },
      get_start_chatting_flag(state){
        return state.chattingFlag;
      },
    },

    actions : {
      //현재 접속자 리스트 가져오기
      current_user_data({commit}, data){
        commit('set_current_user_data', data);
      },
      start_chatting({commit}, flag){
        console.log(flag)
        commit('set_start_chatting_flag', flag);
      }
    }
}


export default chattingSocketModule;