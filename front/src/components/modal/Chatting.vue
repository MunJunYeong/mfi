<template>
    <v-container  class="wrapper">
        <v-row  class="header">
            <v-col cols="10" class="userName">
                <!-- {{userName}} -->
                userName
            </v-col>
            <v-col cols="2" v-on:click="quitChatting">
                <v-icon large color="" style="cursor:pointer" >
                    mdi-close
                </v-icon>
            </v-col>
        </v-row>
        <br> <br>
        <v-row class="content" >
            <v-col cols="1" />
            <!-- <v-col cols="10" v-if="contents.length > 0">
                <ChattingContent v-for="(item, index) in this.contents" :key="index"
                    :data = "item.data"
                />
            </v-col> -->
            <v-col cols="1" />
        </v-row>
        <v-row class="textInput">
            <v-col cols="8" class="inputText">
                <v-text-field
                label="내용 입력"
                v-model="msg"
                hide-details="auto"
                />
            </v-col>
            <v-col cols="3">
                <v-btn v-on:click="sendMsg" class="sendBtn">
                    전송
                </v-btn>
            </v-col>
            <v-col cols="1" />
        </v-row>
    </v-container>

</template>
<script>
/* eslint-disable */
import ChattingContent from './ChattingContent.vue';

export default {
    created () {
    },
    components: {
        ChattingContent
    },
    props : [
        'data',
        'roomName',
        'chatHistory'
    ],
    computed : {
        userData : function(){
            return  this.$store.getters.auth_get_data;
        },
        userName : function(){
            const a = this.data.nickName;
            const b= this.data.target.nickName;
            let res;
            this.userData.nickName === a ? res =b : res = a;
            return res;
        },
        contents : function(){
            const temp  = {
                data : 'lest'
            }
            return temp;
        }
    },
    data() {
        return {
            msg : '',
        }
    }, 
    methods : {
        async sendMsg(){
            const temp = {
                roomName : this.data.roomName,
                msg : this.msg,
                myUserIdx : this.userData.userIdx,
            }
            try{
                await this.$store.dispatch('sendMessage', temp);
            }catch(err){
                console.log(err);
            }
        },
        async quitChatting(){
            alert('ddfaf')
        }
    }
}
</script>


<style scoped>
    .wrapper {
        width: 300px; height: 500px; background-color: yellow; justify-items: center;
        position:relative; 
        z-index: 1; padding-right: 20px;
    }
    .header{
        padding-top: 12px;padding-left: 10px;
    }
    .userName{
        font-size: 19px; font-weight: 700;
    }
    .closeBtn{
        padding-right: 20px;
    }
    .content{
        background-color: green; height: 320px; padding: 10px 10px 10px 10px;
    }
    .textInput{
         position:absolute; bottom : 15px;
    }
    .sendBtn{
        width: 20px;
    }
</style>
