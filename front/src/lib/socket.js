import { io } from "socket.io-client";
const { VUE_APP_BACKEND_HOST } = process.env;
const token = localStorage.getItem('accessToken');



const socket = io(VUE_APP_BACKEND_HOST ,{
  auth: {
    token: token
  },
  withCredentials: true,
});

// const init = () => {
// }
//이 부분에 대한 이해가 조금 부족한 것 같음.
const chatting = io.connect('http://localhost:8080/chatting', {
  auth: {
    token: token
  },
  withCredentials: true,
});



export {
  socket,
  chatting,
};