<template>
    <v-row justify='center'>
        <!-- <v-col cols='1' /> -->
        <v-col cols='12'>
            <div id="otherNickName">
                <h3 style="display : inline;">{{nickName}}</h3> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h6 style="display : inline">{{createdAt}}</h6>
            </div>
            <div id="otherComment">
                {{comment}}
            </div>
        </v-col>
        <!-- <v-spacer /> -->
    </v-row>
</template>
<script>
import moment from 'moment';
moment.lang('ko', {
    weekdaysShort: ["일","월","화","수","목","금","토"],
});
    export default {
        name: 'commentItem',
        created(){
        },
        props: [
            'nickName',
            'comment',
            'created',
        ],
        computed: {
            createdAt() {
                return moment(this.created).format("YY-MM-DD (ddd)  HH : mm");
            }
        },
        data(){
            return{
            }
        },
        methods : {
            
        },
    }
</script>