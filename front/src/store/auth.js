import axios from "axios";
import jwt_decode from 'jwt-decode'
const { VUE_APP_BACKEND_HOST } = process.env;
const authModule = {
    state : {
        userCount : {},
        ideaCount : {},
        todayVisitorCount : {},
        totalVisitorCount : {},
        userData : {},
        userToken : {},
        userListData : [],
        userRole : {},
        adminUser : [],
        adminTotalPages : {},
        adminTotalItems : {},
    },
    mutations: {
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
        user_set_data_admin(state, userData){
            state.adminUser = userData.user;
            state.adminTotalPages = userData.totalPages;
            state.adminTotalItems = userData.totalItems
        },
        set_user_role(state, param){
            const tempArray = [...state.adminUser]
            const findIndex = tempArray.findIndex((data) => data.userIdx === param.userIdx );
            if(findIndex > -1 ){ tempArray[findIndex].role = param.role }
            state.adminUser = [...tempArray]
        }
    },
    getters: {
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
        admin_get_user_items(state){
            return state.adminUser;
        },
        admin_get_total_pages(state){
            return state.adminTotalPages;
        },
        admin_get_total_items(state){
            return state.adminTotalItems;
        },
        admin_get_user_role(state){
            return state.userRole;
        }
    },
    actions: {
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
        async auth_login ({ commit }, loginData) {
            let res;
            try {
                res = await axios.post( VUE_APP_BACKEND_HOST + '/signIn', {
                    id : loginData.id,
                    pw : loginData.pw
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
        //admin이 유저 리스트 가져오기
        async get_user_list_admin({commit}, data){
            let res;
            let token = localStorage.getItem('accessToken');
            if(!token){
                return;
            }
            let where = `page=+${data.page}`;
            if(data.nickName !== ''){
                where += `&nickName=${data.nickName}`
            }
            try{
                res = await axios.get( VUE_APP_BACKEND_HOST + `/user?${where}`,{
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
            let token = localStorage.getItem('accessToken');
            try{
                res = await axios.put( VUE_APP_BACKEND_HOST + '/user',{
                    role : data.role,
                    userIdx : data.userIdx
                },
                {
                    headers : {
                        'Authorization' : token
                    }
                })
                commit('set_user_role', { userIdx: data.userIdx, role: res.data } );
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