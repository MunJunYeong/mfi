import axios from "axios";
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
                let message = res.data.message;
                if(message === 'force logout'){
                    alert('다른 기기에서 로그인하여 로그아웃 되었습니다. 재 로그인 해주세요.')
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    location.href='/home'; //새로고침
                    return;
                }else{
                    alert(message); return;
                }
            }
            commit('user_set_data_admin', res.data);
            
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
        async logout({commit}, userIdx){
            let res;
            try{
                res = await axios.put(VUE_APP_BACKEND_HOST + '/logout', {
                    userIdx : userIdx
                })
            }catch(err){
                console.log(err)
            }
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            commit
            res
        },
        async auth_refresh_token({commit}, token) {
            let renewToken;
            renewToken = await axios.get(VUE_APP_BACKEND_HOST + '/refresh', {
                headers : {
                    AccessToken : token.accessToken,
                    RefreshToken : token.refreshToken,
                }
            })
            if(renewToken.data.message === 'expired token'){ //refreshToken도 만료
                alert('토큰의 유효기간이 지났습니다. 재 로그인 해주세요.');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                location.href='/home'; //새로고침
                return;
            }
            localStorage.setItem('accessToken', renewToken.data);
            // await this.dispatch('get_user_data', renewToken.data);
            // location.href=''; //이것이 맞는지 ?
            commit
            return renewToken.data;
        },
    }
  }


  export default authModule