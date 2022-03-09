<template>
    <v-container>
        <v-container class="pc">
            <v-row justify='center'>
                <v-col cols='12'>
                    <a id="title" :href="this.url"  target="_blank">{{tit}}</a>  <br>
                    <span id="content">{{subcontent}}</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="publish">{{ohnm}} &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;</span>  <span id="date">{{dt}}</span>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="mobile">
            <v-row justify='center'>
                <v-col cols='12'>
                    <a id="moTitle" :href="this.url"  target="_blank">{{tit}}</a>  <br>
                    <span id="moContent">{{moSubcontent}}</span>
                    <br>
                    <span id="moPublish">{{ohnm}} &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;</span>  <span id="moDate">{{moDt}}</span>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>
<script>
export default {
    name: 'newsList',
    props: [
        "tit",
        "subcontent",
        "dt",
        "ohnm",
        "oid", "aid"
    ],
    computed : {
        url (){
            return `https://finance.naver.com/news/news_read.naver?article_id=${this.aid}&office_id=${this.oid}`;
        },
        moSubcontent(){
            return this.subcontent.substring(0, 45)+'...';
        },
        moDt(){
            return this.dt.substring(0,4)+ '-' + this.dt.substring(4,6) +'-' + this.dt.substring(6,8);
        },
        
    },
    data(){
        return{
            
        }
    },
    method :{

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
    #title{
        font-size: 1.3em; font-weight: 600; cursor: pointer; color: midnightblue;
    }
    #content{
        font-size: 0.9em; font-weight: 420;
    }
    #date{
        font-size: 0.7em; font-weight: 350;
    }
    #publish{
        font-size: 0.7em; font-weight: 350;
    }
    
    #moTitle{
        font-size: 1.1em; font-weight: 600; cursor: pointer; color: midnightblue;
    }
    #moContent{
        font-size: 0.9em; font-weight: 420;
    }
    #moDate{
        font-size: 0.7em; font-weight: 350;
    }
    #moPublish{
        font-size: 0.7em; font-weight: 350;
    }
</style>