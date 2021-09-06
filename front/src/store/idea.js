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
            return state.ideaList[0];
        },
        click_idea_get_data(state){
            return state.clickIdeaData[0];
        },
        comment_get_data(state){
            return state.commentData[0];
        }
    },
    actions: {
        //아이디어 보여주기
        async idea_show ({ commit }) {
            let res;
            try {
                res = await axios.get('http://localhost:8080/idea', {
                    headers : {
                        'Authorization' : token
                    }
                });
                commit('idea_set_data', res.data.data);
            } catch (err) {
                console.log(err);
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
                commit('click_idea_set_data', res.data.data)
            }catch(err){
                console.log(err);
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
            }catch(err){
                console.log(err)
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
                })
            }catch(err){
                console.log(err);
            }
            res
        }
    }
}

  export default ideaModule