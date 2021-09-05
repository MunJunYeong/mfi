<template>
    <v-row justify='center'>
        <v-spacer />
        <v-col cols='10'>
            <div id="otherNickName">
                <h2 style="display : inline;">{{nickName}}</h2> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h6 style="display : inline">{{created}}</h6>
            </div>
            <div id="otherComment">
                {{comment}}
            </div>
        </v-col>
        <v-spacer />
    </v-row>
</template>
<script>
    export default {
        name: 'commentItem',
        created(){
        },
        props: [
            'nickName',
            'comment',
            'created',
        ],
        data(){
            return{
            }
        },
        methods : {
            
        },
    }
</script>