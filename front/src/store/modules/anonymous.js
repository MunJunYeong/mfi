/* eslint-disable */

import jwt_decode from 'jwt-decode'
import {anonymous} from '../../services/rest'
import {anonymousService} from '../../services/graphql';
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
            let res;
            try{
                res =await anonymousService.checkId(data.id);
            }catch(err){
                console.log(err);
            }
            return res.data.checkId.isSuccess;
        },
        async check_nick_name({commit}, data){
            let res;
            try{
                res =await anonymousService.checkNickName(data.nickName);
            }catch(err){
                console.log(err);
            }
            return res.data.checkNickName.isSuccess;
        },
        async send_email({commit}, data){
            let checkFlag;
            try{
                checkFlag =await anonymousService.checkEmail(data.email);
            }catch(err){
                console.log(err);
            }
            if(!checkFlag.data.checkEmail.isSuccess){
                return {message : 'exist email'}
            }
            let res;
            try{
                res = await anonymousService.sendMail(data.email);
            }catch(err){
                console.log(err);
            }
            return res.data.sendMail.isSuccess;
        },
        async check_auth_email({commit}, data){
            let res;
            const input = {
                email : data.email,
                no : data.no
            }
            try{
                res =await anonymousService.checkAuth(input);
            }catch(err){
                if(err.message === 'wrong no'){
                    throw new Error(err.message);
                }
            }
            console.log(res)
            return res.data.checkAuth.isSuccess;
        },
        async sign_up({commit}, data){
            let res;
            const input = {
                id : data.id,
                pw : data.pw,
                nickName : data.nickName,
                email : data.email
            }
            try{
                res =await anonymousService.signUp(input);
            }catch(err){
                console.log(err);
            }
            return res.data.signUp;
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
                res= await anonymousService.signIn(input);
            }catch(err){
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