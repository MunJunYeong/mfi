import { io } from "socket.io-client";
const { VUE_APP_BACKEND_HOST } = process.env;


let socket = io(VUE_APP_BACKEND_HOST ,{
  withCredentials: true,
});



export default socket;