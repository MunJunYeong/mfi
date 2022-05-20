import { io } from "socket.io-client";
const { VUE_APP_BACKEND_HOST } = process.env;
const token = localStorage.getItem('accessToken');



let socket = io(VUE_APP_BACKEND_HOST ,{
  query: token,
  withCredentials: true,
});



export default socket;