import  chattingService from '../../services/chatting';

const chattingSocketModule = {
    state : {
      currentConnectUserData : [],
      joinRooms: [],
      chattingList : [
        {
          content : '',
          userIdx : ''
        }
      ],
    },
    mutations : {
      set_current_user_data(state, data){
        state.currentConnectUserData = data;
      },
      set_join_room(state, data){
        const joinRooms = [...state.joinRooms];
        console.log(data)
        joinRooms.push({
          roomName:data.roomName,
          chatHistory: [],
          data : data,
        })
        state.joinRooms = joinRooms;
      },
      set_chatting(state, data){

      }
    },

    getters : {
      get_current_user_data(state){
        console.log(state.currentConnectUserData)
        return state.currentConnectUserData;
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
        chattingService.joinTargetRoom(data);
        commit('set_join_room',data )
      },
      joinTargetRoom({commit}, data){
        commit('set_join_room',data )
      },

      sendMessage({commit}, data){
        chattingService.sendMsg(data);
      }
    }
}


export default chattingSocketModule;