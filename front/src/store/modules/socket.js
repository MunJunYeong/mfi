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

      //chatting socket 관리 다 함
      async current_user_data({commit}){
        //chatting 소켓 서버 접속
        chatting.emit('connectUser');
        //현재 접속 중인 회원 리스트 가져오기
        chatting.on('getUserList', (data)=> {
          commit('set_current_user_data', data);
        });
        let flag2 = false;
        chatting.on('sendApply', (data)=> {
          if(data){
            flag2 = confirm(`${data}님으로부터 채팅 요청이 왔습니다. 수락하시겠습니까?`);
            if(!flag2) return;
          }
        });
        console.log('dfasfasfsa')
      },

      async apply_chatting({commit}, userIdx){
        commit
        // const flag = confirm('채팅을 신청하겠습니까?');
        // if(!flag)return;
        await chatting.emit('applyChatting', userIdx);
      }
    }
}


export default socketModule