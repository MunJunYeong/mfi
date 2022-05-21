import { io } from "socket.io-client";
const { VUE_APP_BACKEND_HOST } = process.env;
const token = localStorage.getItem('accessToken');



const socket = io(VUE_APP_BACKEND_HOST ,{
  auth: {
    token: token
  },
  withCredentials: true,
});

const init = () => {
  // const test = io.connect('http://localhost:8080/testsocket')
}
export {
  socket,
  init
};