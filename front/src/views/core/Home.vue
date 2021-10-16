<template>
    <v-container >
        <link href="https://unpkg.com/vueperslides/dist/vueperslides.css" rel="stylesheet">
        <!-- main -->
        <br><br>
        <v-row justify="center">
            <v-row justify="center">
                <v-col cols='4' />
                <v-col cols='4' style="text-align: center;">
                     <h1>성공적인 투자 분석</h1> <br>
                     <p>가치있는 투자자와 함께 합니다.</p>
                </v-col>
                <v-col cols='4' />
                
            </v-row>                 
        </v-row>

        <v-row justify="center"> 
            <v-col cols='2' />
            <v-col col='4'>
                <hr style="border : solid 2px green;">
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
                    />
                </VueperSlides>
            </v-col>
            <v-col cols='2' />
        </v-row>

        <v-row justify="center" style="text-align : center">
            <v-col cols='2' />
            <v-col cols='2' class="model"  >
                <div class="modelContainer">
                    <div style="height : 200px">
                        <img src="" alt="">
                    </div>
                    <div style="height : 150px">
                        내 정보와 내가 적은 주식 분석 글을 확인해보세요 !
                    </div>
                    <div>
                        <router-link to="info">내 정보 바로가기</router-link>
                    </div>
                </div>
            </v-col>
            <v-col cols='2' class="model">
                <div class="modelContainer">
                    <div style="height : 200px">
                        <img src="" alt="">
                    </div>
                    <div style="height : 150px">
                        다양한 기업에 대한 분석과 투자 스타일을 확인해보세요 !!
                    </div>
                    <div>
                        <router-link to="idea">아이디어 바로가기</router-link>
                    </div>
                </div>
            </v-col>
            <v-col cols='2' class="model">
                <div class="modelContainer">
                    <div style="height : 200px">
                        <img src="" alt="">
                    </div>
                    <div style="height : 150px"> 
                        MFI를 이용하기 전, 어떤 사이트인지 확인해보세요 !
                    </div>
                    <div>
                        <router-link to="about">MFI 약관 바로가기</router-link>
                    </div>
                </div>
            </v-col>
            <v-col cols='2' class="model">
                <div class="modelContainer">
                    <div style="height : 200px">
                        <img src="" alt="">
                    </div>
                    <div style="height : 150px">
                        d
                    </div>
                    <div>
                        <router-link to="info">d 바로가기</router-link>
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
                    content : '본인의 투자 분석과 생각에 대해 마음껏 펼쳐보세요 <router-link to="add-idea"> 회원가입 하기</router-link>',
                    link: "auth/signup",

                }
            ]
        }
    },

  }
</script>
<style>
    image {
        -webkit-filter: blur(5px); -moz-filter: blur(5px); -o-filter: blur(5px); -ms-filter: blur(5px); filter: blur(5px);
    }
    .model {
        padding: 10px 10px 10px 10px; 
    }
    .modelContainer{
        border: 1px solid black; height: 400px;
    }
</style>