import  chattingService from '../../services/chatting';

const chattingSocketModule = {
    state : {
      currentConnectUserData : [],
      joinRooms: [],
    },
    mutations : {
      set_current_user_data(state, data){
        state.currentConnectUserData = data;
      },
      set_join_room(state, data){
        const joinRooms = [...state.joinRooms];
        //socket때처럼 배열의 idx를 하고싶은데 home.vue에서 v-for index로 돌리기때문에 안됨.
        joinRooms.push({
          roomName:data.roomName,
          chatHistory: [],
          data : data,
        })
        state.joinRooms = joinRooms;
      },
      send_msg(state, data){
        let roomIdx;
        for(let i = 0; i < state.joinRooms.length; i++){
          if(state.joinRooms[i].roomName === data.roomName){
            roomIdx = i; break;
          }
        }
        let idx = state.joinRooms.length-1;
        state.joinRooms[roomIdx].chatHistory.push({float : 'right', msg : data.msg, index : idx});
      },
      receive_msg(state, data){
        let roomIdx;
        for(let i = 0; i < state.joinRooms.length; i++){
          if(state.joinRooms[i].roomName === data.roomName){
            roomIdx = i; break;
          }
        }
        let idx = state.joinRooms.length-1;
        state.joinRooms[roomIdx].chatHistory.push({float : 'left', msg : data.msg, index : idx});
      },
      remove_chatting(state, data){
        let roomIdx;
        for(let i = 0; i < state.joinRooms.length; i++){
          if(state.joinRooms[i].roomName === data.roomName){
            roomIdx = i; break;
          }
        }
        const a = [...state.joinRooms];
        a.splice(roomIdx,1);

      
        const joinRooms = [...a];
        state.joinRooms = joinRooms;
      },
    },
    getters : {
      get_current_user_data(state){
        return state.currentConnectUserData;
      },
      get_join_room(state){
        return state.joinRooms;
      },
      get_chat_history : (state) => (roomName) => {
        let roomIdx;
        for(let i = 0; i < state.joinRooms.length; i++){
          if(state.joinRooms[i].roomName === roomName){
            roomIdx = i; break;
          }
        }
        return state.joinRooms[roomIdx].chatHistory;
      },
      
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
        commit('send_msg', data);
        chattingService.sendMsg(data);
      },
      receiveMsg({commit}, data){
        commit('receive_msg', data);
      },
      quitChatting({commit}, data){
        chattingService.quitChatting(data);
        commit('remove_chatting', data);
      },
      receiveQuitChatting({commit}, data){
        alert('상대방이 채팅방을 나갔습니다.');
        commit('remove_chatting', data);
      }
    }
}


export default chattingSocketModule;