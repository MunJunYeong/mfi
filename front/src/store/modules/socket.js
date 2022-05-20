import socket from '../../lib/socket';
// socket.on("connect", () => {
//   console.log('socket 통신이 연결되었습니다.'); // x8WIv7-mJelg7on_ALbx
// });



const socketModule = {

    state : {
      currentConnectUserCount : {},

    },
    mutations : {
      set_current_user_count(state, data){
        state.currentConnectUserCount = data;
      },
    },

    getters : {
      get_current_user_count(state){
        return state.currentConnectUserCount;
      },
    },

    actions : {
      get_current_user_count({commit}){
        socket.on('current', (data)=> {
          commit('set_current_user_count', data);
        })
      },
      get_current_private_count({commit}){
        socket.on('verify', (data)=> {
          console.log(data)
          commit
        })
      }
    }
}


export default socketModule