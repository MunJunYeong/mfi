import  chattingService from '../../services/chatting';

const chattingSocketModule = {
    state : {
      currentConnectUserData : [],
      room: {},
      joinRooms : [],
    },
    mutations : {
      set_current_user_data(state, data){
        state.currentConnectUserData = data;
      },
      set_join_room(state, data){
        // setting room
        state.room[data.roomName] = {
          roomName:data.roomName,
          chatHistory: [],
          data : data,
        }
        //setting joinRooms
        let temp = [];
        Object.keys(state.room).forEach(key => {
          temp.push(state.room[key]);
        })
        state.joinRooms = temp;
      },
      set_receive_msg(state, data){
        const userIdx = this.getters.auth_get_data.userIdx; //현재 나의 userIdx
        let float = '';

        data.userIdx === userIdx ? float = 'right' : float = 'left';
        
        let idx = state.joinRooms.length-1;
        state.room[data.roomName].chatHistory.push({
          float : float,
          msg : data.msg,
          index : idx
        })
      },
      remove_chatting(state, data){
        //state.room 삭제
        delete state.room[data.roomName];

        //state.joinRooms 삭제
        let temp = [];
        Object.keys(state.room).forEach(key => {
          temp.push(state.room[key]);
        })
        state.joinRooms = temp;
      },
    },
    getters : {
      get_current_user_data(state){
        return state.currentConnectUserData;
      },
      get_join_room(state){
        return state.joinRooms;
      },
      get_have_room : (state) => (tempRoomName)=>{
        return state.room[tempRoomName];
      },
      get_chat_history : (state) => (roomName) => {
        return state.room[roomName].chatHistory;
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
        chattingService.sendMsg(data);
      },
      receiveMsg({commit}, data){
        commit('set_receive_msg', data);
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