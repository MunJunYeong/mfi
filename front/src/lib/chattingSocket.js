
import { io } from "socket.io-client";
import store from '../store'
const { VUE_APP_BACKEND_HOST } = process.env;
const token = localStorage.getItem('accessToken');

let socket;

const chatSocketInit = () => {
  socket = io(VUE_APP_BACKEND_HOST+'/chatting', {
    auth: {
      token: token
    },
    withCredentials: true,
  });
}



const registChatEventListner = () => {
  if(!socket) return;

  socket.on('connecting_user', (data)=> {
    console.log(data)
    store.dispatch('current_user_data', data);
  });
  //요청이 들어왔을 경우
  socket.on('applyResponse', (data)=> {
    if(!data) return;
    const flag = confirm(`${data}님으로부터 채팅 신청이 왔습니다. 수락하시겠습니까?`);
    if(!flag) return;
    //true false true false 값으로 변동주기
    store.dispatch('startChatting', true);
  });

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