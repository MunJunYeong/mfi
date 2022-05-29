import { io } from "socket.io-client";
import store from '../store'
const { VUE_APP_BACKEND_HOST } = process.env;
const token = localStorage.getItem('accessToken');



let socket;

const chatSocketInit = async () => {
  socket = await io(VUE_APP_BACKEND_HOST+'/chatting', {
    auth: {
      token: token
    },
    withCredentials: true,
  });
}

const registChatEventListner = () => {
  if(!socket) return;

  socket.on('connecting_user', (data)=> {
    console.log(data);
    store.dispatch('current_user_data', data);
  });
};

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
};