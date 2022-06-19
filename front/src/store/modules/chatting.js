import  chattingService from '../../services/chatting';

const chattingSocketModule = {
    state : {
      currentConnectUserData : [],
      chattingFlag : false,
      roomName : '',
      joinRooms: []
    },
    mutations : {
      set_current_user_data(state, data){
        state.currentConnectUserData = data;
      },
      set_start_chatting_flag(state, flag){
        state.chattingFlag = flag;
      },
      set_join_room(state, data){
        const joinRooms = [...state.joinRooms];
        joinRooms.push({
          roomName:data,
          chatHistory: [],
          targetUserIdx: ''
        })
        state.joinRooms = joinRooms;
      }
    },

    getters : {
      get_current_user_data(state){
        return state.currentConnectUserData;
      },
      get_start_chatting_flag(state){
        return state.chattingFlag;
      },
      get_join_room(state){
        return state.joinRooms;
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
      joinRoom({commit}, data){
        chattingService.joinRoom(data);
        commit('set_join_room',data )
      },

      sendMessage({commit}, msg){

      }
    }
}


export default chattingSocketModule;