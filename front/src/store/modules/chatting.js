import  chattingService from '../../services/chatting';

const chattingSocketModule = {
    state : {
      currentConnectUserData : [],
      chattingFlag : false,
      roomName : '',
    },
    mutations : {
      set_current_user_data(state, data){
        state.currentConnectUserData = data;
      },
      set_start_chatting_flag(state, flag){
        state.chattingFlag = flag;
      },
      set_room_name(state, roomName){
        state.roomName = roomName;
      }
    },

    getters : {
      get_current_user_data(state){
        return state.currentConnectUserData;
      },
      get_start_chatting_flag(state){
        return state.chattingFlag;
      },
      get_room_name(state){
        return state.roomName;
      }
    },

    actions : {
      //현재 접속자 리스트 가져오기
      current_user_data({commit}, data){
        commit('set_current_user_data', data);
      },
      resultApplyChatting({commit}, data){
        chattingService.sendResultApply(data);
      },
      joinRoom({commit}, roomName){
        chattingService.joinRoom(roomName);
        commit('set_room_name', )
      },

      sendMessage({commit}, msg){

      }
    }
}


export default chattingSocketModule;