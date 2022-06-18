
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
  socket.on('applyResponse', (data)=> {
    console.log(data)
    if(!data) return;
    const flag = confirm(`${data.nickName}님으로부터 채팅 신청이 왔습니다. 수락하시겠습니까?`);
    //true면 채팅 시작, false면 채팅 거부
    data.flag = flag;
    store.dispatch('resultApplyChatting', data);
  });
  socket.on('rejectChatting', (nickName)=> {
    alert(`${nickName}님이 채팅 신청을 거절했습니다.`);
  })
  socket.on('joinRoom', (roomName)=> {
    store.dispatch('joinRoom', roomName);
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