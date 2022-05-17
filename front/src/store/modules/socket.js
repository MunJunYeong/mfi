import { io } from "socket.io-client";
const socket = io("http://localhost:8080", {
  withCredentials: true,
});


socket.on("connect", () => {
  console.log('socket 통신이 연결되었습니다.'); // x8WIv7-mJelg7on_ALbx
});

socket.on("current", (data) => {
  console.log(data);
});

const socketModule = {
    state : {

    },
    mutations : {

    },
    getters : {

    },
    actions : {

    }
}


export default socketModule