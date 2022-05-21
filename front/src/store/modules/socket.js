import {socket} from '../../lib/socket';

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
        socket.emit('test', { a: 1})
      }
    }
}


export default socketModule