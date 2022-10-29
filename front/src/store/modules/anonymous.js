/* eslint-disable */

import {anonymous} from '../../services/graphql';
import * as chattingSocket from '../../lib/socket/chattingSocket';

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
        //1. 토큰이 유효한지, 2. 토큰의 값과 해당 유저의 값과 일치한지
        async get_user_data({commit}, token){
            let res;
            try{
                res = await anonymous.getUserData(token);
            }catch(err){
                console.log(err.message);
                if(err.message === 'unvalid accesstoken'){
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    alert('유효하지 않는 토큰입니다. 다시 로그인해주세요.');//accesstoken만 이상하고 refresh같은경우 보완해줘야됨
                    return;
                }
                if(err.message === 'force logout'){
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    alert('다른 기기에서 로그인 하였습니다. 다시 로그인해주세요.');
                    return;
                }
            }
            commit('auth_set_data', res.data.getUserData);
            return {data : 1};
        },
        //회원가입
        async check_id({commit}, data){
            let res;
            try{
                res =await anonymous.checkId(data.id);
            }catch(err){
                console.log(err);
            }
            return res.data.checkId.isSuccess;
        },
        async check_nick_name({commit}, data){
            let res;
            try{
                res =await anonymous.checkNickName(data.nickName);
            }catch(err){
                console.log(err);
            }
            return res.data.checkNickName.isSuccess;
        },
        async send_email({commit}, data){
            let checkFlag;
            try{
                checkFlag =await anonymous.checkEmail(data.email);
            }catch(err){
                console.log(err);
            }
            if(!checkFlag.data.checkEmail.isSuccess){
                return {message : 'exist email'}
            }
            let res;
            try{
                res = await anonymous.sendMail(data.email);
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
                res =await anonymous.checkAuth(input);
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
                res =await anonymous.signUp(input);
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
                res= await anonymous.signIn(input);
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
            let res;
            try{
                res = await anonymous.sendIdMail(data.email)
            }catch(err){
                if(err.message === 'wrong email'){
                    throw new Error(err.message);
                } else {
                    throw new Error('system error');
                }
            }
            return res.data.sendIdMail.isSuccess;
        },
        async find_pw_send_email({commit}, data){
            let res;
            try{
                res = await anonymous.sendPwMail(data.email, data.id);
            }catch(err){
                console.log(err)
                if(err.message === 'wrong email'){
                    throw new Error(err.message);
                }
                if(err.message === 'wrong id'){
                    throw new Error(err.message);
                }
                throw new Error(err.message);
            }
            return res.data.sendPwMail.isSuccess;
        },
        async update_pw({commit}, data){
            let res;
            const input = {
                email : data.email,
                pw : data.pw,
            }
            try{
                res = await anonymous.updatePw(input);
            }catch(err){
                console.log(err);
            }
            if(res) return true;
            else return false;
        },
    }
}


  export default anonymousModule