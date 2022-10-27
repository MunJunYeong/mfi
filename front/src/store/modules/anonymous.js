/* eslint-disable */

import jwt_decode from 'jwt-decode'
import anonymous from '../../services/anonymous';
import * as chattingSocket from '../../lib/socket/chattingSocket';

import {apolloClient} from '../../lib/graphql/apollo';
import graphqlQuery from '../../lib/graphql/queries';

const anonymousModule = {
    state: {
        userData : {},
    },
    mutations: {
        auth_set_data (state, authData) { // 로그인 한 유저 데이터 저장
            state.userData = {...authData};
        },
    },
    getters: {
        //로그인 한 유저 데이터 gettter
        auth_get_data (state) {
            return state.userData;
        },
        auth_get_token(){
            // return state.userToken
            return localStorage.getItem('accessToken')
        },
    },
    actions: {
        //해당 토큰을 가진 userIdx를 찾은 다음 user 정보 가져오기
        async get_user_data({commit}, token){
            const userIdx = jwt_decode(token).userIdx 
            const res = await anonymous.getUserData(userIdx, token);
            if(res.data.message === 'force logout'){
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                return res.data.message;
            }
            await commit('auth_set_data', res.data.data);
            return {data : 1};
        },
        //회원가입
        async check_id({commit}, data){
            return await anonymous.checkId(data.id);
        },
        async check_nick_name({commit}, data){
            return await anonymous.checkNickName(data.nickName);
        },
        async send_email({commit}, data){
            return await anonymous.sendEmail(data.email);
        },
        async check_auth_email({commit}, data){
            return await anonymous.checkAuthEmail(data.email, data.no);
        },
        async sign_up({commit}, data){
            return await anonymous.signUp(data.id, data.pw, data.nickName, data.email);
        },
        //로그인
        async sign_in({commit}, data){
            const input = {
                id : data.id,
                pw : data.pw,
                isForce: data.isForce
            }
            let res;
            try{
                res = await apolloClient.mutate({
                    mutation : graphqlQuery.signIn,
                    variables : {
                        input
                    }
                })
            }catch(err){
                err = err.graphQLErrors[0];
                if(err.message === 'wrong pw'){
                    throw new Error(err.message);
                }
                if(err.message === 'wrong id'){
                    throw new Error(err.message);
                }
                if(err.message === 'isLogin'){
                    throw new Error(err.message);
                }
            }
            res = res.data.signIn;
            if(res.token){
                localStorage.setItem("accessToken", res.token);
                localStorage.setItem("refreshToken", res.refreshToken);
                await this.dispatch('get_user_data', res.token ); //login part라서 return값이 불 필요.
                await chattingSocket.initialize();
                history.back();
                return res;
            }
        },
        async find_id_send_email({commit}, data){
            const res = await anonymous.findIdSendEmail(data);
            return res.data;
        },
        async find_pw_send_email({commit}, data){
            const res = await anonymous.findPwSendEmail(data);
            return res;            
        },
        async find_pw_check_email({commit}, data){
            const res = await anonymous.findPwCheckEmail(data);
            return res;            
        },
        async update_pw({commit}, data){
            const res = await anonymous.updatePw(data);
            return res;            
        },
    }
}


  export default anonymousModule