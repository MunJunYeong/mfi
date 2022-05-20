import {socket, test} from '../../lib/socket';

//io로 새로운 room space를 만들어야하는데 이걸 lib socket에서 만들어야하는지 ?



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
        //test
        socket.on('test', (data)=> {
          console.log(data)
        })
      },
      get_current_private_count({commit}){
        test.on('verify', (data)=> {
          console.log(data)
          commit
        })
      }
    }
}


export default socketModule