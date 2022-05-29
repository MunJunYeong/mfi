import { io } from "socket.io-client";
import store from '../store'
const { VUE_APP_BACKEND_HOST } = process.env;
const token = localStorage.getItem('accessToken');


let socket;
let chatting;

// const globalSocketInit = async () => {
//   socket = io(VUE_APP_BACKEND_HOST ,{
//     auth: {
//       token: token
//     },
//     withCredentials: true,
//   });
// };


const chatSocketInit = async () => {
  chatting = await io.connect('http://localhost:8080/chatting', {
    auth: {
      token: token
    },
    withCredentials: true,
  });
}

const registGlobalEventListner = async () => {
  if(!socket) return;
  
  socket.on('current', (data) => {
    store.dispatch('current_user_count', data);
  })
};

const registChatEventListner = async () => {
  if(!chatting) return;

  chatting.on('connecting_user', (data)=> {
    console.log(data);
    store.dispatch('current_user_data', data);
  });
};

const globalInit = async () => {
  // await globalSocketInit();
  await registGlobalEventListner();
}


const chatInit = async () => {
  console.log(chatting);
  await chatSocketInit();
  console.log(chatting);
  await registChatEventListner();
}

const disconnect = async () => {
  if(socket) { 
    socket.disconnect();
    socket = undefined;
  }
  if(chatting) { 
    chatting.disconnect(); 
    chatting = undefined;
  }

}
//이 부분에 대한 이해가 조금 부족한 것 같음.






export {
  globalInit,
  chatInit,
  disconnect,
  socket,
  chatting,
};