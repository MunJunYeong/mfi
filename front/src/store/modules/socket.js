import {socket, chatting} from '../../lib/socket';

//io로 새로운 room space를 만들어야하는데 이걸 lib socket에서 만들어야하는지 ?

const socketModule = {

    state : {
      currentConnectUserCount : {},
      currentConnectUserData : [],

    },
    mutations : {
      set_current_user_count(state, data){
        state.currentConnectUserCount = data;
      },
      set_current_user_data(state, data){
        state.currentConnectUserData = data;
      }
    },

    getters : {
      get_current_user_count(state){
        return state.currentConnectUserCount;
      },
      get_current_user_data(state){
        return state.currentConnectUserData;
      }
    },

    actions : {
      current_user_count({commit}){
        socket.on('current', (data)=> {
          commit('set_current_user_count', data);
        })
      },

      
      current_user_data({commit}){
        // const token = localStorage.getItem('accessToken');
        chatting.on('connect_user', (data)=> {
          console.log(data)
          commit('set_current_user_data', data);
        })
        // socket.emit('connect_user');
        
        // socket.on('connect_user', (data)=> {
        //   console.log(data)
        // })
        commit
      }
    }
}


export default socketModule