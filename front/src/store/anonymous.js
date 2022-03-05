import axios from "axios";
const { VUE_APP_BACKEND_HOST } = process.env;
import jwt_decode from 'jwt-decode'

const anonymousModule = {
    state: {
        news : [],
        userCount : {},
        ideaCount : {},
        todayVisitorCount : {},
        totalVisitorCount : {},
        userData : {},
        userToken : {},
    },
    mutations: {
        set_news(state, data){
            state.news = data;
        },
        user_count (state, count){
            state.userCount = count;
        },
        idea_count (state, count){
            state.ideaCount = count;
        },
        today_visitor_count (state, count){
            state.todayVisitorCount = count;
        },
        total_visitor_count (state, count){
            state.totalVisitorCount = count;
        },
        auth_set_data (state, authData) { // 로그인 한 유저 데이터 저장
            state.userData = {...authData};
        },
        auth_set_token(state, token){
            state.userToken = token;
        },
    },
    getters: {
        get_news_item(state){
            return state.news;
        },
        get_user_count(state){
            return state.userCount;
        },
        get_idea_count(state){
            return state.ideaCount;
        },
        get_today_visitor_count(state){
            return state.todayVisitorCount;
        },
        get_total_visitor_count(state){
            return state.totalVisitorCount;
        },
        auth_get_data (state) {
            return state.userData;
        },
        auth_get_token(){
            // return state.userToken
            return localStorage.getItem('accessToken')
        },
    },
    actions: {
        async get_news({commit}){
            let res;
            try{
                res = await axios.get( VUE_APP_BACKEND_HOST + '/news', {
                })
            }catch(err){
                console.log(err);
            }
            commit('set_news', res.data);
        },
        //메인페이지 정보 
        async get_user_count({commit}){
            let res;
            try{
                res = await axios.get( VUE_APP_BACKEND_HOST + '/userCount', {
                })
            }catch(err){
                console.log(err);
            }
            commit('user_count', res.data);
        },
        async get_idea_count({commit}){
            let res;
            try{
                res = await axios.get( VUE_APP_BACKEND_HOST + '/ideaCount', {

                })
            }catch(err){
                console.log(err);
            }
            commit('idea_count', res.data);
        },
        async get_today_visitor_count({commit}){
            let res;
            try{
                res = await axios.get( VUE_APP_BACKEND_HOST + '/todayVisitor', {

                })
            }catch(err){
                console.log(err);
            }
            commit('today_visitor_count', res.data);
        },
        async get_total_visitor_count({commit}){
            let res;
            try{
                res = await axios.get( VUE_APP_BACKEND_HOST + '/totalVisitor', {

                })
            }catch(err){
                console.log(err);
            }
            commit('total_visitor_count', res.data);
        },

        //로그인
        async auth_login ({ commit }, data) {
            console.log(data)
            let res;
            try {
                res = await axios.post( VUE_APP_BACKEND_HOST + '/signIn', {
                    id : data.id,
                    pw : data.pw
                });
            } catch (err) {
                console.log(err);
            }
            if(res.data.token){
                localStorage.setItem("accessToken", res.data.token);               
                commit('auth_set_data',  jwt_decode(res.data.token));
                commit('auth_set_token', res.data.token);
                history.back();
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
        async find_id_send_email({commit}, data){
            let res;
            try {
                res = await axios.post(VUE_APP_BACKEND_HOST + '/findId', {
                    email : data.email,
                })
            }catch(err) {
                console.log(err);
            }
            console.log(res.data)
            if(res.data.message === 'wrong access'){
                alert('이메일이 정상적으로 입력되지 않았습니다.'); return;
            }else if ( res.data.message === 'no data'){
                alert('존재하지 않는 이메일입니다.'); return;
            }else if(res.data.data === 1){
                alert('사용자님의 이메일로 아이디를 발송했습니다.'); return;
            }
            commit
        },
        async find_pw_send_email({commit}, data){
            let res;
            try {
                res = await axios.post(VUE_APP_BACKEND_HOST + '/findPw', {
                    id : data.id,
                    email : data.email,
                })
            }catch(err) {
                console.log(err);
            }
            commit
            return res;            
        },
        async find_pw_check_email({commit}, data){
            let res;
            try {
                res = await axios.post(VUE_APP_BACKEND_HOST + '/checkEmail', {
                    email : data.email,
                    no : data.no,
                })
            }catch(err) {
                console.log(err);
            }
            commit
            return res;            
        },
        async update_pw({commit}, data){
            let res;
            try {
                res = await axios.put(VUE_APP_BACKEND_HOST + '/updatePw', {
                    email : data.email,
                    pw : data.pw,
                    id : data.id
                })
            }catch(err) {
                console.log(err);
            }
            commit
            return res;            
        }
    }
}


  export default anonymousModule