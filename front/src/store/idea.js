import axios from "axios";

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
            let res;
            let baseUrl = 'http://localhost:8080/idea?page='+data.page;
            if(data.subject) {
                baseUrl += `&subject=${data.subject}`
            }
            try{
                res = await axios.get( baseUrl , {
                    params: {
                        role : data.role,
                        order : data.order,
                        userIdx : data.userData.userIdx,
                        userRole : data.userData.role,
                    }
                });
                commit('idea_set_data', res.data);
                return;
            }catch(err){
                console.log(err);
                return;
            }
        },
        //내가 쓴 아이디어 보여주기
        async show_my_idea({commit}, data){
            let token = localStorage.getItem('accessToken');

            let res;
            let where = `page=${data.page}&userIdx=${data.userIdx}`
            if(data.subject !== ''){
                where += `&subject=${data.subject}`
            }
            try{
                res = await axios.get(`http://localhost:8080/info/idea?${where}`,{
                    headers : {
                        'Authorization' : token
                    }
                });
                commit('idea_set_data', res.data);
                return;
            }catch(err){
                console.log(err);
                return;
            }
        },
        async show_admin_user_idea({commit}, data){
            let token = localStorage.getItem('accessToken');
            let res;
            let where = `page=${data.page}`
            if(data.subject !== undefined){
                where += `&subject=${data.subject}`
            }
            try{
                res = await axios.get(`http://localhost:8080/user/${data.userIdx}/idea?${where}`,{
                    headers : {
                        'Authorization' : token
                    }
                });
                commit('idea_set_data', res.data);
                return;
            }catch(err){
                console.log(err);
                return;
            }
        },
        //아이디어 클릭했을 때
        async click_idea({commit}, data) {
            let token = localStorage.getItem('accessToken');
            let res;
            try {
                res = await axios.get(`http://localhost:8080/idea/${data.ideaIdx}`, 
                {
                    headers : {
                        'Authorization' : token
                    }
                });
                if(res.data.message === 'unvalid token'){
                    alert('회원가입 후 확인해주세요');
                    location.href='#/idea'
                    return;
                }
                commit('click_idea_set_data', res.data.data);
                return;
            }catch(err){
                console.log(err);
                return;
            }
        },        
        //아이디어 추가
        async add_idea({commit}, data){
            let token = localStorage.getItem('accessToken');
            let res;
            console.log(data)
            try {
                res = await axios.post('http://localhost:8080/idea',{
                    subject : data.subject,
                    content : data.content,
                },
                {
                    headers : {
                        'Authorization' : token
                    }
                });
                commit
                if(res.data.message === 'no subject'){
                    alert('제목을 입력해주세요.');
                } else if(res.data.message === 'no content'){
                    alert('내용을 입력해주세요.');
                } else {
                    alert("아이디어를 무사히 제출했습니다!");
                    location.href='#/idea'
                }
            }catch(err){
                console.log(err)
            }
        },

        //아이디어 수정
        async modify_idea({commit}, ideaData){
            let res;
            let token = localStorage.getItem('accessToken');
            if(!ideaData.subject){
                alert('제목을 입력해주세요.');
                return;
            }
            if(!ideaData.content){
                alert('내용을 입력해주세요.');
                return;
            }
            try{
                res = await axios.put('http://localhost:8080/idea/:ideaIdx', 
                {
                    params : {
                        ideaIdx : ideaData.ideaIdx,
                        subject : ideaData.subject,
                        content : ideaData.content
                    }
                },
                {
                    headers : {
                        'Authorization' : token
                    }
                })
                if(res.data.data[0] === 1){
                    commit('change_modify_flag', true);
                }
            }catch(err){
                console.log(err);
                return;
            }
        },
        async idea_comment({commit}, ideaIdx){
            let res;
            let token = localStorage.getItem('accessToken');

            try {
                res = await axios.get('http://localhost:8080/comment?ideaIdx='+ ideaIdx.ideaIdx, {
                    headers : {
                        'Authorization' : token
                    }
                });
                commit('click_comment_set_data', res.data.data);
                return;
            }catch(err){
                console.log(err)
                return;
            }
            
        },
        
        async delete_idea({commit}, ideaData){
            let res;
            let token = localStorage.getItem('accessToken');
            try{
                res = await axios.delete('http://localhost:8080/idea?ideaIdx='+ ideaData.ideaIdx,
                {
                    headers : {
                        'Authorization' : token
                    }
                });
                commit
                console.log(res);
                return;
            }catch(err){
                console.log(err);
                return;
            }
        },
        async add_comment({commit}, commentData){
            let res;
            let token = localStorage.getItem('accessToken');

            commit
            try {
                res = await axios.post('http://localhost:8080/comment', 
                {
                    comment : commentData.comment,
                    ideaIdx : commentData.ideaIdx
                },
                {
                    headers : {
                        'Authorization' : token
                    }
                });
                res
                return;
            }catch(err){
                console.log(err);
                return;
            }   
        },
        
    }
}

  export default ideaModule