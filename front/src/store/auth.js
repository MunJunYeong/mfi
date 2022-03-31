import axios from "axios";
// import jwt_decode from 'jwt-decode'
const { VUE_APP_BACKEND_HOST } = process.env;

const authModule = {
    state : {
        userListData : [],
        userRole : {},
        adminUser : [],
        adminTotalPages : {},
        adminTotalItems : {},
    },
    mutations: {
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
            }catch(err){
                console.log(err);
            }
            if(res.data.message){
                alert(res.data.message === 'unvalid token' ? '토큰의 유효기간이 지났습니다. 재 로그인 해주세요.' : '시스템 오류가 발생했습니다. 잠시 후 시도해주세요.')
                localStorage.removeItem('accessToken');
                location.href='/home';
                return;
            }
            commit('user_set_data_admin', res.data);
            console.log(res)
            
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
            let res;
            if(!token) {
                return;
            }
            try{
                res = await axios.get(VUE_APP_BACKEND_HOST + '/token', {
                    headers : {
                        Authorization : token
                    }
                })
            }catch(err){
                console.log(err)
            }
            //왜 지워지는지
            if(res.data.message){
                alert(res.data.message === 'unvalid token' ? '토큰의 유효기간이 지났습니다. 재 로그인 해주세요.' : '로그인을 해주세요.')
                localStorage.removeItem('accessToken');
                localStorage.removeItem('vuex');
                location.href='/home'; //새로고침
                return;
            }
            commit
        }
    }
  }


  export default authModule