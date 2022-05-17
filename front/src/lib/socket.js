import { io } from "socket.io-client";

// const whitelist = ['http://localhost:8081','http://localhost:8080', 'http://mfinvest.kr', 'http://backend.mfinvest.kr']
// const socket = io(whitelist.forEach((item)=> {
//   item
// }), {
//   withCredentials: true,
// });

let socket = io('http://mfinvest.kr' ,{
  withCredentials: true,
});



export default socket;