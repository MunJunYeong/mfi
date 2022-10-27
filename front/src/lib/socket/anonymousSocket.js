import { io } from "socket.io-client";
import store from '../../store'
const { VUE_APP_BACKEND_HOST } = process.env;

let socket;

const anonymousSocketInit = async () => {
    socket = io(VUE_APP_BACKEND_HOST ,{
      withCredentials: true,
    });
  };

  const registEventListner = () => {
    if(!socket) return;
    
    socket.on('current', (data) => {
      store.dispatch('current_user_count', data);
    })
  };

  const initialize = async () => {
    await anonymousSocketInit();
    await registEventListner();
  }

  const disconnect = async () => {
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