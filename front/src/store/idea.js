import axios from "axios";

let token = localStorage.getItem("accessToken");

const ideaModule = {
    state: {
        ideaList : [],
    },
    mutations: {
        idea_set_data (state, ideaData) {
            state.ideaList.push(ideaData.data);
            // console.log(state.ideaList)
        }
    },
    getters: {
        idea_get_data(state){
            return state.ideaList
        },
    },
    actions: {
        //로그인
        async idea_show ({ commit }) {
            let res;
            try {
                res = await axios.get('http://localhost:8080/idea', {
                    headers : {
                        'Authorization' : token
                    }
                });
            } catch (err) {
                console.log(err);
            }
            commit('idea_set_data', res.data)
        },
        
    }
}

  export default ideaModule