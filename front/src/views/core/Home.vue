
<template>
    <v-container style=""> 
        <!-- background-color:#F5F5F5; -->
        <!-- pc row -->
        <v-row id="pc_main" class="main">
            <v-col cols="'10">
                <v-row >
                    <v-col cols='1'>
                    </v-col >
                    <v-col cols='11'>
                        <v-col class="imageWrapper"  style="text-align: center;">
                            <div id="imageText">
                                <h1 id="mfi_mean">Metaphor For Investing</h1> <br><br>
                                <p class="subtitle">MFI는 금융시장의 메타포를 찾기 위한 아이디어를 공유하는 장소입니다.</p>
                            </div>
                        </v-col>
        
                    </v-col>
                    <br> <br><br><br><br>
                </v-row >
                <v-row justify="center" > 
                    <v-col cols='1' />
                    <v-col col='11'>
                        <hr id="line">
                    </v-col>
                </v-row>
                <v-row justify="center" >
                    <v-col cols='3' />
                    <v-col cols="9">
                        <h2 style="font-size : 30px;">MFI Highlight</h2> 
                        <h4>MFI는 웹을 활용하여 주식 종목 분석 정보를 얻고, 다양한 견해를 생각해볼 수 있습니다.</h4>
                    </v-col>
                </v-row>
                <v-row justify="center" style="text-align : center" >
                    <v-col cols='1' />
                    <v-col cols='3' class="model"  >
                        <div class="modelContainer">
                            <div class = "div_article">
                                <img src="@/assets/user.svg" alt="주식 분석 글" class="article">
                            </div>
                            <div class="article_content">
                                <br> 함께하는 투자자 <br> <span style="font-size : 2em"> {{userCount}} </span> 명
                            </div>
                            <!-- <div>
                                <router-link to="info" class="link_to" style="color:#5C6BC0">내 정보 바로가기</router-link>
                            </div> -->
                        </div>
                    </v-col>
                    <v-col cols='3' class="model">
                        <div class="modelContainer">
                            <div class="div_article">
                                <img src="@/assets/idea.svg" alt="경제 사진" class="article">
                            </div>
                            <div class="article_content">
                                <br> 현재 종목 분석 글 <br> <span style="font-size : 2em"> {{ideaCount}} </span> 개
                                <br> <span style="font-size:0.7em">(모든 종목 분석 글이며, 회원 등급에 따라 수가 달라질 수 있습니다.)</span>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols='3' class="model"  >
                        <div class="modelContainer">
                            <div class = "div_article">
                                <img src="@/assets/visit.svg" alt="방문자" class="article">
                            </div>
                            <div class="article_content">
                                <br> 방문자 수 <br> today : <span style="font-size : 2em"> {{todayVisitor}} </span> <br>
                                total : {{totalVisitor}}
                            </div>
                        </div>
                    </v-col>
                 </v-row>
            </v-col>
            <v-col cols="2">
                <br><br>
                <v-row justify="center">
                    <div id="circle">접</div> 
                    접속자 : {{currentUserCount}}명 <br> <br>
                </v-row>
                <v-row justify="center">
                    <v-col cols='12'>
                        <VirtualList style="height: 360px; overflow-y: auto;" 
                            :data-key="'userIdx'"
                            :data-sources="connectionUserList"
                            :data-component="userComponent"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row v-if="joinRooms.length > 0" class="chatting" id="pc_main">
            <Chatting v-for="(item,index) in this.joinRooms" :key ="index" 
                :data="item.data"
                :roomName = "item.roomName"
                :chatHistory = "item.chatHistory"
            />
        </v-row>

        <!-- mobile row -->
        <v-row class="mobile_item">
            <v-col class="model"  >
                <div class="mobile_container">
                    <div class = "mobile_article">
                        <img src="@/assets/idea.svg" alt="방문자" class="mobile_img">
                    </div>
                    <div class="mobile_article_content">
                        <br> 현재 종목 분석 글 <br> <span style="font-size : 2em"> {{ideaCount}} </span> 개
                        <br> <span style="font-size:0.7em">(모든 종목 분석 글이며, 회원 등급에 따라 수가 달라질 수 있습니다.)</span>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row class="mobile_item">
            <v-col class="model"  >
                <div class="mobile_container">
                    <div class = "mobile_article">
                        <img src="@/assets/user.svg" alt="방문자" class="mobile_img">
                    </div>
                    <div class="mobile_article_content">
                        <br> 함께하는 투자자 <br> <span style="font-size : 2em"> {{userCount}} </span> 명
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row class="mobile_item">
            <v-col class="model"  >
                <div class="mobile_container">
                    <div class = "mobile_article">
                        <img src="@/assets/visit.svg" alt="방문자" class="mobile_img">
                    </div>
                    <div class="mobile_article_content">
                        <br> 방문자 수 
                        <br> today : <span style="font-size : 2em"> {{todayVisitor}} </span>
                        <br> today : {{totalVisitor}}
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
/* eslint-disable */
import ConnectionUser from '../../components/ConnectionUser.vue';
import VirtualList from 'vue-virtual-scroll-list'
import Chatting from '../../components/modal/Chatting.vue';

// import ChatWindow from 'vue-advanced-chat'
// import 'vue-advanced-chat/dist/vue-advanced-chat.css'

  export default {
    name: 'Home',
    components: {
        // ChatWindow,
        ConnectionUser,
        Chatting,
        VirtualList,
    },
    created() {
        this.getUserCount();
        this.getIdeaCount();
        this.getTodayVisitorCount();
        this.getTotalVisitorCount();
    },
    computed : {
        userCount : function(){
            return this.$store.getters.get_user_count.data;
        },
        ideaCount : function(){
            return this.$store.getters.get_idea_count.data;
        },
        todayVisitor : function(){
            return this.$store.getters.get_today_visitor_count.data;
        },
        totalVisitor : function(){
            return this.$store.getters.get_total_visitor_count.data;
        },
        currentUserCount : function(){
            return this.$store.getters.get_current_user_count;
        },
        connectionUserList : function(){
            return this.$store.getters.get_current_user_data;
        },
        joinRooms : function(){
            return this.$store.getters.get_join_room;
        }
    },
    data() {
        return {
            userComponent : ConnectionUser,
            items : this.connectionUserList
        }
    },
    methods : {
        async getUserCount(){
            try{
                await this.$store.dispatch('get_user_count', {
                })
            }catch(err){
                console.log(err)
            }
        },
        async getIdeaCount(){
            try{
                await this.$store.dispatch('get_idea_count', {
                })
            }catch(err){
                console.log(err)
            }
        },
        async getTodayVisitorCount(){
            try{
                await this.$store.dispatch('get_today_visitor_count', {
                })
            }catch(err){
                console.log(err)
            }
        },
        async getTotalVisitorCount(){
            try{
                await this.$store.dispatch('get_total_visitor_count', {
                })
            }catch(err){
                console.log(err)
            }
        },
    }

  }
</script>

<style scoped>
@media all and (max-width:767px) {
    #pc_main, .pc_margin, .pc_item{
        display: none;
    }
}
@media all and (max-width:1023px) {
    #pc_main, .pc_margin, .pc_item{
        display: none;
    }
}
@media all and (min-width:1024px) {
    .mobile_item{
        display: none;
    }
}
.imageWrapper{
    background-image: url("../../assets/home_idea.jpg"); background-repeat : no-repeat;
    background-size : cover; opacity: 0.85;
}
.main{
    position: relative;
}
.chatting{
    position:fixed; bottom:30px; right: 100px;
}

#mfi_mean{
   font-family: 'Chosunilbo_myungjo'; color: white; line-height: 200px;
    font-size:80px; font-weight: 900;
}
.subtitle{
    font-family: 'Chosunilbo_myungjo';color: white; 
    font-size:22px;
    font-weight: normal; font-weight: 900;
}

#main_center{
    width: 75%;
}

#circle{
    width: 25px; display: inline-block; height: 25px; color: greenyellow;
    border-radius: 50%; background: greenyellow;
}
.vueSlider{
    font-size:30px;
}
image {
    -webkit-filter: blur(5px); -moz-filter: blur(5px); -o-filter: blur(5px); -ms-filter: blur(5px); filter: blur(5px);
}
.model {
    padding: 10px 10px 10px 10px; 
}
.modelContainer{
    height: 400px;
}
#line{
    border : solid 2px #43A047;
}
.mobile_container{
    height: 300px;
}
.mobile_img{
    width: 150px; height: 150px;
}
.mobile_article{
    width: 100%; height: 150px; margin:0 auto; text-align: center;
}
.mobile_article_content{
    width: 100%; text-align: center;
}
.div_article{
    width: 100%;
    height:150px;
    overflow:hidden;
    margin:0 auto;
}
.article{
    width:130px;
    height:150px;
    object-fit:cover;
}
.article_content{
    width: 100%;
    height:150px;
    text-align: center;
    /* display: table-cell; */
    vertical-align: middle;
    font-family: 'S-CoreDream-3Light';
    font-weight: bold;
}

@font-face {
    font-family: 'SLEIGothicTTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.0/SLEIGothicTTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Chosunilbo_myungjo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Chosunilbo_myungjo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
     font-family: 'S-CoreDream-3Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}
@font-face {
    font-family: 'NEXON Lv1 Gothic OTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
</style>