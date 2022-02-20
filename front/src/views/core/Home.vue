<template>
    <v-container style=""> 
        <!-- background-color:#F5F5F5; -->
        <link href="https://unpkg.com/vueperslides/dist/vueperslides.css" rel="stylesheet">
        <!-- pc row -->
        <v-row justify="center" style="height : 400px;" id="pc_main">
            <v-row justify="center" id="main">
                <v-col cols='12' class="imageWrapper"  style="text-align: center;">
                    <div id="imageText">
                        <h1 id="mfi_mean">Metaphor For Investing</h1> <br><br>
                        <p class="subtitle">MFI는 금융시장의 메타포를 찾기 위한 아이디어를 공유하는 장소입니다.</p>
                    </div>
                </v-col>
            </v-row>                 
        </v-row > 
        <br class="pc_margin"> <br class="pc_margin"><br class="pc_margin"><br class="pc_margin"><br class="pc_margin">
        <v-row justify="center" class="pc_margin"> 
            <v-col cols='1' />
            <v-col col='10'>
                <hr>
            </v-col>
            <v-col cols='1' />
        </v-row >
        <v-row justify="center">
            <v-col cols='1' />
            <v-col>
                <h2 style="font-size : 30px;">MFI Highlight</h2> 
                <h4>MFI는 웹을 활용하여 주식 종목 분석 정보를 얻고, 다양한 견해를 생각해볼 수 있습니다.</h4>
            </v-col>
        </v-row>
         <v-row justify="center" style="text-align : center" class="pc_item">
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
                    <!-- <div>
                        <router-link to="info" class="link_to" style="color:#5C6BC0">내 정보 바로가기</router-link>
                    </div> -->
                </div>
            </v-col>
            <v-col cols='1' />
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
// import { VueperSlides, VueperSlide } from 'vueperslides'

  export default {
    name: 'Home',
    components: {
        // VueperSlides,VueperSlide,

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
        }
    },
    data() {
        return {
            slides : [
                {
                    image : require('@/assets/home_signup.jpg'),
                    content : `가치있는 투자자인가요? 회원가입 하기`,
                    link: "/auth/signup",
                },
                {
                    image : require('@/assets/home_idea.jpg'),
                    content : '본인의 투자 분석과 생각에 대해 마음껏 펼쳐보세요',
                    link: "/idea",

                }
            ],
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
    #mfi_mean{
       font-family: 'Chosunilbo_myungjo'; color: white; line-height: 200px;
        font-size:80px; font-weight: 900;
    }
    .subtitle{
        font-family: 'Chosunilbo_myungjo';color: white; 
        font-size:22px;
        font-weight: normal; font-weight: 900;
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
    hr{
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
    .link_to{
        text-decoration: underline;
        font-family: 'NEXON Lv1 Gothic OTF';
        font-size:17px;
        text-shadow: 1px 1px 1px #BDBDBD; 
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