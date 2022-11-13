/* eslint-disable */
import auth from '../../services/rest/auth';
import { authService } from '../../services/graphql';
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
            let token = localStorage.getItem('accessToken');
            if(!token){
                return;
            }
            const res = await auth.getUserList(data, token);
            
            if(res.data.message){
                let message = res.data.message;
                if(message === 'force logout'){
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    location.href='/home'; //새로고침
                    return {message : message};
                }else {
                    return {message : message};
                }
            }
            commit('user_set_data_admin', res.data);
            
        },
        async change_user_role({commit}, data){
            let token = localStorage.getItem('accessToken');
            const res = await auth.changeUserRole(data, token);
            commit('set_user_role', { userIdx: data.userIdx, role: res.data } );
        },
        async logout({commit}, userIdx){
            const res = await auth.logout(userIdx);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
        async auth_refresh_token({commit}, token) {
            const renewToken = await auth.refreshToken(token);
            if(renewToken.data.message === 'expired token'){ //refreshToken도 만료
                alert('토큰의 유효기간이 지났습니다. 재 로그인 해주세요.');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                location.href='/home'; //새로고침
                return;
            }
            localStorage.setItem('accessToken', renewToken.data);
            return renewToken.data;
        },
        async auth_re_issue_token({commit}, token) {
            let newToken;
            try{
                newToken = await authService.issueAccessToken(token.refreshToken);
            }catch(err){
                console.log(err);
            }
            console.log(newToken)
        },
    }
  }


  export default authModule