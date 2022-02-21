<template>
    <v-container>
        <!-- pc version -->
        <v-row justify='center' id="ideaItem" v-on:click = "clickIdea(ideaIdx)" class="pc">
            <v-col cols='1' />
            <v-col cols='1' class="table">
                {{number}}
            </v-col>
            <v-col cols='4' class="table" style="overflow : hidden;" >
                {{pcSubject}}
            </v-col>
            <v-col cols='3' class="table" style="overflow : hidden;">
                {{nickName}}
            </v-col>
            <v-col cols='2' class="table" style="overflow : hidden;">
                {{createdAt}}
            </v-col>
            <v-col cols='1'></v-col>
        </v-row>
        <v-row class="pc">
            <v-col cols='1' />
        </v-row>

        <!-- mobile version -->
        <v-row justify='center' id="ideaItem" v-on:click = "clickIdea(ideaIdx)" class="mobile">
            <v-col cols='3' id="ideaIdx" style="overflow : hidden; text-align: center; font-size: 0.8em;">
                {{number}}
            </v-col>
            <v-col cols='5' id="subject" style="overflow : hidden; text-align: center; font-size: 0.8em;" >
                {{mobileSubject}}
            </v-col>
            <v-col cols='4' id="nickName" style="overflow : hidden; text-align: center; font-size: 0.8em;">
                {{mobileNickName}}
            </v-col>
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
            },
            pcSubject(){
                return this.subject.substr(0,17);
            },
            mobileSubject(){
                return this.subject.substr(0,6);
            },
            mobileNickName(){
                return this.nickName.substr(0,4);
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
@media all and (max-width:767px) {
    .pc{
        display: none;
    }
}
@media all and (max-width:1023px) and (min-width:767px) {
    .mobile{
        display: none;
    }
    /* 태블릿은 잘보임 */
}
@media all and (min-width:1024px) {
    .mobile{
        display: none;
    }
}
    .table{
       height: 40px; text-align: center; padding: 0px;
        
    }
</style>