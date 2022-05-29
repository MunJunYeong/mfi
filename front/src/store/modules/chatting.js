
import {socket} from '../../lib/chattingSocket';

//io로 새로운 room space를 만들어야하는데 이걸 lib socket에서 만들어야하는지 ?

const chattingSocketModule = {
    state : {
      currentConnectUserData : [],

    },
    mutations : {
      set_current_user_data(state, data){
        state.currentConnectUserData = data;
      }
    },

    getters : {
      get_current_user_data(state){
        return state.currentConnectUserData;
      }
    },

    actions : {
      async current_user_data({commit}, data){
        
        commit('set_current_user_data', data);
      
        console.log('dfasfasfsa')
      },

      async apply_chatting({commit}, userIdx){
        commit
        // const flag = confirm('채팅을 신청하겠습니까?');
        // if(!flag)return;
        await socket.emit('applyChatting', userIdx);
      }
    }
}


export default chattingSocketModule;