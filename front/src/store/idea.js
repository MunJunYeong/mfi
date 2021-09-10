import axios from "axios";
let token = localStorage.getItem('accessToken');

const ideaModule = {
    state: {
        ideaList : [],
        clickIdeaData : [],
        commentData : [],
    },
    mutations: {
        idea_set_data (state, ideaData) {
            state.ideaList = [];
            state.ideaList.push(ideaData);
        },
        click_idea_set_data(state, ideaData){
            state.clickIdeaData = []; //하..
            state.clickIdeaData.push(ideaData);
        },
        click_comment_set_data(state, commentData){
            state.commentData = [];
            state.commentData.push(commentData);
        }
    },
    getters: {
        idea_get_data(state){
            // console.log(state.ideaList)
            return state.ideaList;
        },
        click_idea_get_data(state){
            return state.clickIdeaData[0];
        },
        comment_get_data(state){
            return state.commentData[0];
        }
    },
    actions: {
        async show_idea({commit}, data){
            let res;
            if(data.subject === ''){
                try{
                    res = await axios.get('http://localhost:8080/idea/size?page='+data.page, {
                        headers : {
                            'Authorization' : token
                        }
                    })
                    commit('idea_set_data', res.data);
                    return;
                }catch(err){
                    console.log(err);
                    return;
                }
            }else {
                try{
                    res = await axios.get(`http://localhost:8080/idea/size?page=${data.page}&subject=${data.subject}`, {
                        headers : {
                            'Authorization' : token
                        }
                    })
                    commit('idea_set_data', res.data);
                    return;
                }catch(err){
                    console.log(err);
                    return;
                }
            }
            
        },
        async click_idea({commit}, ideaIdx ) {
            let res;
            try {
                res = await axios.get('http://localhost:8080/idea/idea-click?ideaIdx='+ideaIdx.ideaIdx, {
                    headers : {
                        'Authorization' : token
                    }
                });
                commit('click_idea_set_data', res.data.data);
                return;
            }catch(err){
                console.log(err);
                return;
            }
            
        },
        async idea_comment({commit}, ideaIdx){
            let res;
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
        async add_comment({commit}, commentData){
            let res;
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
            
        }
    }
}

  export default ideaModule