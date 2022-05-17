import { io } from "socket.io-client";



let socket = io('http://backend.mfinvest.kr' ,{
  withCredentials: true,
});



export default socket;