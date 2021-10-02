<template>
    <v-row justify='center'>
        <v-spacer />
        <v-col cols='10'>
            <div id="otherNickName">
                <h2 style="display : inline;">{{nickName}}</h2> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h6 style="display : inline">{{createdAt}}</h6>
            </div>
            <div id="otherComment">
                {{comment}}
            </div>
        </v-col>
        <v-spacer />
    </v-row>
</template>
<script>
    import moment from 'moment';

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
                return moment(this.created).format("YY-MM-DD ㅣ HH시 mm분");
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