<template>
    <v-container style="background-color:#F5F5F5;">
        <link href="https://unpkg.com/vueperslides/dist/vueperslides.css" rel="stylesheet">
        <!-- main -->
        <br><br>
        <v-row justify="center">
            <v-row justify="center">
                <v-col cols='4' />
                <v-col cols='4' style="text-align: center;">
                     <h1>성공적인 투자 분석</h1> <br>
                     <p class="subtitle">가치있는 투자자와 함께 합니다.</p>
                </v-col>
                <v-col cols='4' />
                
            </v-row>                 
        </v-row>

        <v-row justify="center"> 
            <v-col cols='2' />
            <v-col col='4'>
                <hr>
            </v-col>
            <v-col cols='2' />
        </v-row >

        <v-row justify="center" >
            <v-col cols='2' />
            <v-col col='4' style="">
                <VueperSlides fade :touchable="false" >
                    <VueperSlide v-for="(slide, i) in slides"
                    :key="i" 
                    :image="slide.image" 
                    :content="slide.content"
                    :link ="slide.link" 
                    :style=" 'color:white; font-size:20px; weight:white; text-shadow:1px gray'"
                    />
                </VueperSlides>
            </v-col>
            <v-col cols='2' />
        </v-row>


        <v-row justify="center" style="text-align : center">
            <v-col cols='2' />
            <v-col cols='2' class="model"  >
                <div class="modelContainer">
                    <div class = "div_article">
                        <img src="@/assets/article1.jpg" alt="주식 분석 글" class="article">
                    </div>
                    <div class="article_content">
                        내 정보와 내가 적은 주식 분석 글을 확인해보세요 !
                    </div>
                    <div>
                        <router-link to="info" class="link_to" style="color:#5C6BC0">내 정보 바로가기</router-link>
                    </div>
                </div>
            </v-col>
            <v-col cols='2' class="model">
                <div class="modelContainer">
                    <div class="div_article">
                        <img src="@/assets/article5.png" alt="경제 사진" class="article">
                    </div>
                    <div class="article_content">
                        다양한 기업에 대한 분석과 투자 스타일을 확인해보세요 !!
                    </div>
                    <div>
                        <router-link to="idea" class="link_to" style="color:#5C6BC0">아이디어 바로가기</router-link>
                    </div>
                </div>
            </v-col>
            <v-col cols='2' class="model">
                <div class="modelContainer">
                    <div class="div_article">
                        <img src="@/assets/article2.jpg" alt="사이트사진" class="article">
                    </div>
                    <div class="article_content"> 
                        MFI를 이용하기 전, 어떤 사이트인지 확인해보세요 !
                    </div>
                    <div>
                        <router-link to="about" class="link_to" style="color:#5C6BC0">MFI 약관 바로가기</router-link>
                    </div>
                </div>
            </v-col>
            <v-col cols='2' class="model">
                <div class="modelContainer">
                    <div class="div_article">
                        <img src="@/assets/article4.jpg" alt="기타" class="article">
                    </div>
                    <div class="article_content">
                        d
                    </div>
                    <div>
                        <router-link to="info" class="link_to" style="color:#5C6BC0">d 바로가기</router-link>
                    </div>
                </div>
            </v-col>
            <v-col cols='2' />
        </v-row>
        
    </v-container>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'

  export default {
    name: 'Home',
    components: {
        VueperSlides,VueperSlide,

    },
    data() {
        return {
            slides : [
                {
                    image : require('@/assets/home_signup.jpg'),
                    content : `가치있는 투자자인가요? 회원가입 하기`,
                    link: "/#/auth/signup",
                },
                {
                    image : require('@/assets/home_idea.jpg'),
                    content : '본인의 투자 분석과 생각에 대해 마음껏 펼쳐보세요',
                    link: "/#/idea",

                }
            ]
        }
    },

  }
</script>
<style>
@font-face {
    font-family: 'SLEIGothicTTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.0/SLEIGothicTTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'KOTRA_BOLD-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.1/KOTRA_BOLD-Bold.woff') format('woff');
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

    h1{
       font-family: 'KOTRA_BOLD-Bold';
        font-size:40px;
    }
    .subtitle{
        font-family: 'Chosunilbo_myungjo';
        font-size:22px;
        font-weight: normal;
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
        border: 1px solid black; height: 400px;
    }
    hr{
        border : solid 2px #43A047;
    }
    .div_article{
        height:200px;
        overflow:hidden;
        margin:0 auto;
    }
    .article{
         width:100%;
        height:100%;
        object-fit:cover;
    }
    .article_content{
        height:150px;
         display: table-cell;
        vertical-align: middle;
        font-family: 'S-CoreDream-3Light';
        text-justify: distribute;
        font-weight: bold;
    }
    .link_to{
        text-decoration: underline;
        font-family: 'NEXON Lv1 Gothic OTF';
        font-size:17px;
        text-shadow: 1px 1px 1px #BDBDBD; 
    }
</style>