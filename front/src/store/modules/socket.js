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
        //chatting 소켓 서버 접속
        chatting.emit('connect user');
        //현재 접속 중인 회원 리스트 가져오기
        chatting.on('getUserList', (data)=> {
          commit('set_current_user_data', data);
        });
      },

      async apply_chatting({commit}, userIdx){
        commit
        await chatting.emit('applyChatting', userIdx);
        await chatting.on('sendApply', (data)=> {
          console.log(data)
        })

      },
    }
}


export default socketModule