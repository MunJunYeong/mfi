import jwt_decode from 'jwt-decode'
import VueCookies from "vue-cookies";
import anonymous from '../../services/anonymous';

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
        async create_visitor(){
            const res =await anonymous.createVisitor();
            
            let now = new Date(); 
            let nextDay = new Date();
            nextDay.setDate(nextDay.getDate()+1);
            nextDay.setHours(0, 0, 0); 
            const second = (nextDay-now)/ 1000;
            VueCookies.set("visitor", res.data.data, second+'s');
        },
        async get_news({commit}){
            const res = await anonymous.getNews();

            if(res.data.message){
                return;
            }else {
                commit('set_news', res.data.data);
            }
            
        },
        //메인페이지 정보 
        async get_user_count({commit}){
            const res = await anonymous.getUserCount();

            if(res.data.message){
                
                return;
            }
            commit('user_count', res.data);
        },
        async get_idea_count({commit}){
            const res = await anonymous.getIdeaCount();

            commit('idea_count', res.data);
        },
        async get_today_visitor_count({commit}){
            const res = await anonymous.getTodayVisitor();

            commit('today_visitor_count', res.data);
        },
        async get_total_visitor_count({commit}){
            const res = await anonymous.getTotalVisitor();
            commit('total_visitor_count', res.data);
        },

        //해당 토큰을 가진 userIdx를 찾은 다음 user 정보 가져오기
        async get_user_data({commit}, token){
            const userIdx = jwt_decode(token).userIdx 
            const res = await anonymous.getUserData(userIdx, token);
            
            if(res.data.message === 'force logout'){
                alert('다른 기기에서 로그인하여 로그아웃 되었습니다. 재 로그인 해주세요.')
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                return;
            }
            await commit('auth_set_data', res.data.data);
            return {data : 1};
        },
        //로그인
        async auth_login ({ commit }, data) {
            const res = await anonymous.login(data);

            if(res.data.token){
                localStorage.setItem("accessToken", res.data.token);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                await this.dispatch('get_user_data', res.data.token );
                history.back();
                commit
                return res.data;
            }else if(res.data.message){
                return res.data;
            }
        },
        
        async auth_force_login ({ commit }, data) {
            const res = await anonymous.forceLogin(data);

            if(res.data.token){
                localStorage.setItem("accessToken", res.data.token);
                localStorage.setItem("refreshToken", res.data.refreshToken);       
                await this.dispatch('get_user_data', res.data.token);
                history.back();
                commit
            }else if(res.data.message){
                return res.data;
            }
        },
        
        async find_id_send_email({commit}, data){
            const res = await anonymous.findIdSendEmail(data);
            commit
            return res.data;
        },
        async find_pw_send_email({commit}, data){
            const res = await anonymous.findPwSendEmail(data);
            
            commit
            return res;            
        },
        async find_pw_check_email({commit}, data){
            const res = await anonymous.findPwCheckEmail(data);

            commit
            return res;            
        },
        async update_pw({commit}, data){
            const res = await anonymous.updatePw(data);

            commit
            return res;            
        },
    }
}


  export default anonymousModule