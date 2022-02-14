<template>
    <v-container>
        <v-row justify='center' id="ideaItem" v-on:click = "clickIdea(ideaIdx)">
            <v-col cols='1' />
            <v-col cols='1' id="ideaIdx">
                {{number}}
            </v-col>
            <v-col cols='3' id="subject" style="overflow : hidden;" >
                {{subject}}
            </v-col>
            <v-col cols='3' id="nickName" style="overflow : hidden;">
                {{nickName}}
            </v-col>
            <v-col cols='2' id="created" style="overflow : hidden;">
                {{createdAt}}
            </v-col>
            <v-col cols='1'></v-col>
        </v-row>
        <v-row>
            <v-col cols='1' />
        </v-row>

    </v-container>

</template>
<script>
import moment from 'moment';
moment.lang('ko', {
    weekdaysShort: ["일","월","화","수","목","금","토"],
});

    export default {
        name: 'ideaList',
        props: [
            "ideaIdx",
            "nickName",
            "subject",
            "created",
            "number",
        ],
        computed: {
            createdAt() {
                return moment(this.created).local().format("YY-MM-DD (ddd) ");
                // return moment(this.created).local().format("YY-MM-DD (ddd)  HH : mm");
            },
            userData(){
                return this.$store.getters.auth_get_data;
            }
        },
        methods : {
            clickIdea(ideaIdx){
                if(this.userData.created === undefined){
                    alert('회원가입 후 게시물을 확인해주세요.')
                }else{
                    this.$router.push({path: `idea/${ideaIdx}`});
                }
            },
        },
    }
</script>

<style scoped>
    #ideaIdx{
       height: 40px; text-align: center; padding: 0px;
        border-bottom: thin solid rgba(0, 0, 0, .2)
    }
    #subject{
        height: 40px; text-align: center; padding: 0px;
        border-bottom: 1px solid rgba(0, 0, 0, .2)

    }
    #nickName{
        height: 40px; text-align: center; padding: 0px;
        border-bottom: 1px solid rgba(0, 0, 0, .2)
    }
    #created{
        height: 40px;text-align: center;
        padding: 0px;border-bottom: 1px solid rgba(0, 0, 0, .2)
    }
</style>