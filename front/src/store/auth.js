import axios from "axios";
import jwt_decode from 'jwt-decode'
let token = localStorage.getItem('accessToken');

const authModule = {
    state : {
        userData : {},
        userListData : [],
        accessToken : {},
    },
    mutations: {
        auth_set_data (state, authData) {
            state.userData = {...authData}
        },
        user_set_data_admin(state, userData){
            state.userListData = [];
            state.userListData.push(userData);
        },
        set_token(state, token){
            state.accessToken = token;
        }
    },
    getters: {
        auth_get_data (state) {
            return state.userData;
        },
        user_get_data_admin(state){
            return state.userListData;
        },
        get_token (state){
            return state.accessToken;
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
            if(res.data.token){
                localStorage.setItem("accessToken", res.data.token);               
                commit('auth_set_data',  jwt_decode(res.data.token));
                commit('set_token', res.data.token);
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
        //admin이 유저 리스트 가져오기
        async get_user_list_admin({commit}, data){
            let res;
            let token = localStorage.getItem('accessToken');
            // let token = this.$store.getters.idea_get_data
            // console.log(this.$store.getters.get_token)
            if(!token){
                return;
            }

            let where = `page=${data.page}`;
            if(data.nickName !== ''){
                where += `&nickName=${data.nickName}`
            }

            try{
                res = await axios.get('http://localhost:8080/user?' + where , {
                        headers : {
                            'Authorization' : token
                        }
                    })
                    commit('user_set_data_admin', res.data);
            }catch(err){
                console.log(err);
            }            
        },

        async change_user_role({commit}, data){
            let res;
            try{
                res = await axios.put('http://localhost:8080/user',{
                    role : data.role,
                    userIdx : data.userIdx
                },
                {
                    headers : {
                        'Authorization' : token
                    }
                })
                commit
                res
            }catch(err){
                console.log(err);
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