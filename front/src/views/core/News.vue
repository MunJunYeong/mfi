<template>
    <v-container>
        <v-container class="pc">
            <br>
            <v-row justify='center'>
                <v-col cols='9' >
                    <v-row>
                        <v-col cols='12'>
                            주요 뉴스
                        </v-col>
                    </v-row>
                    <v-row>
                        <NewsItem  v-for="(item, index) in newsItem"  :key="index"
                        :title="item.title"
                        :content="item.content"
                        :date="item.date"
                        />
                    </v-row>
                    
                </v-col>
                <v-col cols='3' style="background-color:yellow;">
                    일주일간 랭킹
                </v-col>
            </v-row>
        </v-container>
        <v-container class="mobile">
            dfasfsafasfsa
        </v-container>
    </v-container>
</template>
<script>
import NewsItem from '../../components/NewsItem.vue'

export default {
    components: {
        NewsItem,
    },
    data(){
        return {

        }
    },
    computed : {
        newsItem : function(){
            const list = [
                {title : '[유럽개장] 일제히 하락세…佛 CAC 1.66%↓', content : '유럽 증시가 4일 장 초반 일제히 하락세를 보이고 있다.이날 오후 5시26분(한국 시간) 기준 프랑스 CAC지수는 전날 대비 1.66% 하락한 6272.38을 나타냈다. 같은 시간..', date:'2022-03-04 17:31:01'},
                {title : '[시황종합] 전쟁 격화에 외인 매도…코스피 1.2%↓', content : '대외 불안정성 확대에 외국인·기관 팔자 나서코스닥 900선 사수…달러·원 환율 1214원까지 올라3일(현지시간) 키이우의 북부 전선..', date:'2022-03-04 18:31:01'}
            ]
            return list;
        }
    },
    methods : {

    }
}
</script>
<style scoped>
    @media all and (max-width:767px) {
    .pc{
        display: none;
    }
}
    @media all and (max-width:1023px) and (min-width:767px) {
        .mobile{
            display: none;
        }
    }
    @media all and (min-width:1024px) {
        .mobile{
            display: none;
        }
    }
</style>