import axios from "axios";
const { VUE_APP_BACKEND_HOST } = process.env;
import jwt_decode from 'jwt-decode'
import VueCookies from "vue-cookies";

const anonymousModule = {
    state: {
        news : [],
        userCount : {},
        ideaCount : {},
        todayVisitorCount : {},
        totalVisitorCount : {},
        userData : {},
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
        async get_news({commit}){
            let res;
            try{
                res = await axios.get( VUE_APP_BACKEND_HOST + '/data/news', {
                })
            }catch(err){
                console.log(err);
            }

            if(res.data.message){
                return;
            }else {
                commit('set_news', res.data.data);
            }
            
        },
        //메인페이지 정보 
        async get_user_count({commit}){
            let res;
            try{
                res = await axios.get( VUE_APP_BACKEND_HOST + '/data/usercount', {
                })
            }catch(err){
                console.log(err);
            }
            if(res.data.message){
                
                return;
            }
            // let test = '업데이트 예정'
            // commit('user_count', test);
            commit('user_count', res.data);
        },
        async get_idea_count({commit}){
            let res;
            try{
                res = await axios.get( VUE_APP_BACKEND_HOST + '/data/ideacount', {

                })
            }catch(err){
                console.log(err);
            }
            commit('idea_count', res.data);
        },
        async get_today_visitor_count({commit}){
            let res;
            try{
                res = await axios.get( VUE_APP_BACKEND_HOST + '/data/todayvisitor', {

                })
            }catch(err){
                console.log(err);
            }
            commit('today_visitor_count', res.data);
        },
        async get_total_visitor_count({commit}){
            let res;
            try{
                res = await axios.get( VUE_APP_BACKEND_HOST + '/data/totalvisitor', {

                })
            }catch(err){
                console.log(err);
            }
            commit('total_visitor_count', res.data);
        },

        //해당 토큰을 가진 userIdx를 찾은 다음 user 정보 가져오기
        async get_user_data({commit}, token){
            let userData;
            const userIdx = jwt_decode(token).userIdx 
            try{
                userData = await axios.get(VUE_APP_BACKEND_HOST + `/data/${userIdx}`, {
                    headers : {
                        'Authorization' : token
                    }
                })
            }catch(err){
                console.log(err);
            }
            await commit('auth_set_data', userData.data.data);
            history.back();
            return {data : 1};
        },
        //로그인
        async auth_login ({ commit }, data) {
            let res;
            try {
                res = await axios.post( VUE_APP_BACKEND_HOST + '/signin', {
                    id : data.id,
                    pw : data.pw
                });
            } catch (err) {
                console.log(err);
            }
            if(res.data.token){
                localStorage.setItem("accessToken", res.data.token);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                await this.dispatch('get_user_data', res.data.token );
                commit
            }else if(res.data.message){
                return res.data;
            }
        },
        //로그인
        async auth_force_login ({ commit }, data) {
            let res;
            try {
                res = await axios.post( VUE_APP_BACKEND_HOST + '/forcesignin', {
                    id : data.id,
                    pw : data.pw
                });
            } catch (err) {
                console.log(err);
            }
            if(res.data.token){
                localStorage.setItem("accessToken", res.data.token);
                localStorage.setItem("refreshToken", res.data.refreshToken);       
                await this.dispatch('get_user_data', res.data.token);
                commit
            }else if(res.data.message){
                return res.data;
            }
        },
        
        async find_id_send_email({commit}, data){
            let res;
            try {
                res = await axios.post(VUE_APP_BACKEND_HOST + '/findid', {
                    email : data.email,
                })
            }catch(err) {
                console.log(err);
            }
            commit
            return res.data;
        },
        async find_pw_send_email({commit}, data){
            let res;
            try {
                res = await axios.post(VUE_APP_BACKEND_HOST + '/findpw', {
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
                res = await axios.post(VUE_APP_BACKEND_HOST + '/checkemail', {
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
                res = await axios.put(VUE_APP_BACKEND_HOST + '/updatepw', {
                    email : data.email,
                    pw : data.pw,
                    id : data.id
                })
            }catch(err) {
                console.log(err);


            }
            commit
            return res;            
        },
        async create_visitor({commit}){
            let res;
            try{
                res = await axios.post(VUE_APP_BACKEND_HOST + '/data/ip', {

                })
            }catch(err){
                console.log(err);
            }
            commit
            let now = new Date(); 
            let nextDay = new Date();
            nextDay.setDate(nextDay.getDate()+1);
            nextDay.setHours(0, 0, 0); 
            const second = (nextDay-now)/ 1000;
            VueCookies.set("visitor", res.data.data, second+'s');
        }
    }
}


  export default anonymousModule