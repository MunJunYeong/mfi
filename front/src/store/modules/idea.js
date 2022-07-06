/* eslint-disable */

import idea from '../../services/idea';

const ideaModule = {
    state: {
        clickIdeaData : {},
        commentData : [],
        successModify : false,
        ideas : [],
        totalPages : {},
        totalItems : {},
    },
    mutations: {
        idea_set_data (state, ideaData) {
            state.ideas = ideaData.ideas;
            state.totalPages = ideaData.totalPages;
            state.totalItems = ideaData.totalItems;
        },
        click_idea_set_data(state, ideaData){
            state.clickIdeaData = {...ideaData[0]};
        },
        click_comment_set_data(state, commentData){
            state.commentData = [];
            state.commentData.push(commentData);
        },
        change_modify_flag(state, success){
            state.successModify = success;
        }
    },
    getters: {
        idea_get_item(state){
            return state.ideas;
        },
        idea_get_total_pages(state){
            return state.totalPages;
        },
        idea_get_total_items(state){
            return state.totalItems;
        },
        click_idea_get_data(state){
            return state.clickIdeaData;
        },
        comment_get_data(state){
            return state.commentData[0];
        },
        modify_get_flage(state){
            return state.successModify
        }
    },
    actions: {
        //전체 아이디어 보여줄 때
        async show_idea({commit}, data){
            const res = await idea.getIdea(data);
            if(res.data.message){
                return 'error';
            }
            commit('idea_set_data', res.data);
            return;
        },
        //내가 쓴 아이디어 보여주기
        async show_my_idea({commit}, data){
            let token = localStorage.getItem('accessToken');

            const res = await idea.getMyIdea(data, token);

            if(res.data.message){
                let message = res.data.message;
                if(message === 'force logout'){
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    return message;
                }else{
                    alert(message); return;
                }
            }else {
                commit('idea_set_data', res.data);
                return;
            }
        },
        async show_admin_user_idea({commit}, data){
            let token = localStorage.getItem('accessToken');
            const res = await idea.getAdminUserIdea(data, token);

            if(res.data.message){
                return 'error';
            }
            commit('idea_set_data', res.data);
            return;
        },
        //아이디어 클릭했을 때
        async click_idea({commit}, data) {
            let token = localStorage.getItem('accessToken');
            const res = await idea.getClickIdea(data, token);
            
            if(res.data.message){
                let message = res.data.message;
                if(message === 'force logout'){
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    return message;
                }
            }else {
                commit('click_idea_set_data', res.data.data);
                return;
            }
        },        
        //아이디어 추가
        async add_idea({commit}, data){
            let token = localStorage.getItem('accessToken');
            
            const res = await idea.addIdea(data, token);
            if(res.data.message){
                return res.data.message;
            }else {
                return 'success'
            }
        },

        //아이디어 수정
        async modify_idea({commit}, data){
            let token = localStorage.getItem('accessToken');
            const res = await idea.modifyIdea(data, token);

            if(res.data.message){
                return 'error';
            }
            if(res.data.data[0] === 1){
                commit('change_modify_flag', true);
            }
        },
        async idea_comment({commit}, ideaIdx){
            let token = localStorage.getItem('accessToken');
            const res = await idea.getComment(ideaIdx, token);
            commit('click_comment_set_data', res.data.data);
        },
        
        async delete_idea({commit}, data){
            let token = localStorage.getItem('accessToken');
            await idea.deleteIdea(data, token);
        },

        async add_comment({commit}, data){
            let token = localStorage.getItem('accessToken');
            const res = await idea.addComment(data, token);
            return res.data;
        },
        
    }
}

  export default ideaModule