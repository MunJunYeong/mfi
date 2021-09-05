import axios from "axios";
import jwt_decode from 'jwt-decode'

const authModule = {
    state : {
        userData : []
    },
    mutations: {
        auth_set_data (state, authData) {
            state.userData.push(authData);
        }
    },
    getters: {
        auth_get_data (state) {
            return state.userData;
        }
    },
    actions: {
        //로그인
        async auth_login ({ commit }, loginData) {
            let res;
            try {
                res = await axios.post('http://localhost:8080/signIn', {
                    id : loginData.id,
                    pw : loginData.pw
                });
            } catch (err) {
                console.log(err);
            }
            console.log(res.data)
            if(res.data.token){
                localStorage.setItem("accessToken", res.data.token);               
                commit('auth_set_data',  jwt_decode(res.data.token));
                location.href='#/home'
            }else if(res.data.message === "wrong pw"){
                throw Error('wrongPw');
            }else if(res.data.message === "not exist id"){
                throw Error('wrongId');
            }else if(res.data.message === 'no data') {
                throw Error('wrongData');
            }else{
                throw Error('somethingIsWrong');
            }
        },
        //토근 유효성 확인
        async auth_vertify_token ({ commit }, token) {
            if(!token) return;

            // 검증은 알아서..
            commit('auth_set_data',  jwt_decode(token));
        }
    }
  }


  export default authModule