import  {statistics} from '../../services';
import VueCookies from "vue-cookies";

const chattingSocketModule = {
    state : {
        news : [],
        userCount : {},
        ideaCount : {},
        todayVisitorCount : {},
        totalVisitorCount : {},
    },
    mutations : {
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
    },
    getters : {
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
    },

    actions : {
        async create_visitor(){
            const res = await statistics.createVisitor();
            
            let now = new Date();
            let nextDay = new Date();
            nextDay.setDate(nextDay.getDate()+1);
            nextDay.setHours(0, 0, 0); 
            const second = (nextDay-now)/ 1000;
            VueCookies.set("visitor", res.data.data, second+'s');
        },
        async get_news({commit}){
            const res = await statistics.getNews();

            if(res.data.message){
                return;
            }else {
                commit('set_news', res.data.data);
            }
        },
        async get_user_count({commit}){
            const res = await statistics.getUserCount();

            if(res.data.message){
                return;
            }
            commit('user_count', res.data);
        },
        async get_idea_count({commit}){
            const res = await statistics.getIdeaCount();
            commit('idea_count', res.data);
        },
        async get_today_visitor_count({commit}){
            const res = await statistics.getTodayVisitor();
            commit('today_visitor_count', res.data);
        },
        async get_total_visitor_count({commit}){
            const res = await statistics.getTotalVisitor();
            commit('total_visitor_count', res.data);
        },
    }
}


export default chattingSocketModule;