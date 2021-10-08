
<template>
    <v-container>
        <v-row justify='center' id="ideaItem" v-on:click = "clickIdea(ideaIdx)">
            <v-col cols='1' />
            <v-col cols='1' id="ideaIdx">
                {{ideaIdx}}
            </v-col>
            <v-col cols='3' id="subject" >
                {{subject}}
            </v-col>
            <v-col cols='3' id="nickName">
                {{nickName}}
            </v-col>
            <v-col cols='2' id="created">
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
        ],
        computed: {
            createdAt() {
                return moment(this.created).format("YY-MM-DD (ddd)  HH : mm");
            }
        },
        methods : {
            clickIdea(ideaIdx){
                this.$router.push({path: `idea/${ideaIdx}`});
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