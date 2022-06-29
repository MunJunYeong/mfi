
import { io } from "socket.io-client";
import store from '../store'
const { VUE_APP_BACKEND_HOST } = process.env;

let socket;

const chatSocketInit = async () => {
  const token = localStorage.getItem('accessToken');
  socket = io(VUE_APP_BACKEND_HOST+'/chatting', {
    auth: {
      token: token
    },
    withCredentials: true,
  });

  socket.on('connect', () => {
  })
}

const registChatEventListner = () => {
  if(!socket) return;
  
  socket.on('connecting_user', (data)=> {
    store.dispatch('current_user_data', data);
  });
  //요청이 들어왔을 경우
  socket.on('applyResponse', async (data)=> {
    if(!data) return;
    const cnt = await store.getters.get_room_count;
    if(cnt >=3){
      store.dispatch('rejectMaximumChatting', data);
      return;
    }
    if(confirm(`${data.nickName}님으로부터 채팅 신청이 왔습니다. 수락하시겠습니까?`)){
      data.flag = true;
      store.dispatch('resultApplyChatting', data);
    }else {
      data.flag = false;
      store.dispatch('resultApplyChatting', data);
    }
    //true면 채팅 시작, false면 채팅 거부
  });
  socket.on('rejectChatting', (nickName)=> {
    alert(`${nickName}님이 채팅 신청을 거절했습니다.`);
  })
  socket.on('rejectMaximumChatting', (nickName)=> {
    alert(`${nickName}님이 현재 만들 수 있는 최대 채팅방 개수를 초과했습니다.
    잠시 후 다시 시도해주세요.`);
  })
  socket.on('joinRoom', (data)=> {
    store.dispatch('joinRoom', data);
  })
  socket.on('joinTargetRoom', (data)=> {
    store.dispatch('joinTargetRoom', data);
  })
  socket.on('receiveMsg', (data)=> {
    store.dispatch('receiveMsg', data);
  })
  //상대방이 나간 정보 받음
  socket.on('sendQuitChatting', (data)=> {
    store.dispatch('receiveQuitChatting', data);
  })
};

const applyResponse = async ()=> {
  if(!socket) return;

}


const initialize = async () => {
  await chatSocketInit();
  await registChatEventListner();
}

const disconnect = async () => {
  if(socket) { 
    socket.disconnect();
    socket = undefined;
  }
}






export {
  initialize,
  disconnect,
  socket,
  applyResponse,
};