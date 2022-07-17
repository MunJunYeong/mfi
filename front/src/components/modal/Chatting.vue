<template>
    <div class="main">
        <v-container  class="wrapper" v-if="chattingSize">
            <v-row  class="header">
                <v-col cols="8" class="userName">
                    {{userName}}
                </v-col>
                <v-col cols="2" v-on:click="minimizeChatting" >
                    <v-icon large color="" style="cursor:pointer" >
                        mdi-minus
                    </v-icon>
                </v-col>
                <v-col cols="2" v-on:click="quitChatting">
                    <v-icon large color="" style="cursor:pointer" >
                        mdi-close
                    </v-icon>
                </v-col>
            </v-row>
            <v-row class="content">
                <v-col cols="12" >
                    <VirtualList ref="toBottom" style="width: 250px;  height : 320px;  overflow-y: auto;" 
                        :data-key="'index'"
                        :data-sources="contents"
                        :data-component="ChattingComponent"
                    />
                </v-col>
            </v-row>
            <v-row class="textInput">
                <v-col cols="8" class="inputText">
                    <v-text-field
                    label="내용 입력"
                    v-model="msg"
                    hide-details="auto"
                    v-on:keyup.enter="sendMsg"
                    />
                </v-col>
                <v-col cols="3">
                    <v-btn v-on:click="sendMsg"  class="sendBtn">
                        전송
                    </v-btn>
                </v-col>
                <v-col cols="1" />
            </v-row>

        </v-container>
        <v-container  class="minimizeWrapper" v-if="!chattingSize"  v-on:click="recover">
            {{userName}}
        </v-container>
    </div>
</template>
<script>
/* eslint-disable */
import ChattingContent from './ChattingContent.vue';
import VirtualList from 'vue-virtual-scroll-list'

export default {
    created () {
    },
    components: {
        ChattingContent,
        VirtualList
    },
    props : [
        'data',
        'roomName',
        'chatHistory',
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
            const data = this.$store.getters.get_chat_history(this.roomName);
            if(!this.isMounted) {
                return data;
            }
            if(!this.startToBottom){
                this.startToBottom = true;
                return data;
            }
           this.$refs.toBottom.scrollToBottom();
           return data;
        },
        chattingSize : function(){
            return this.$store.getters.get_chatting_size;
        }
    },
    data() {
        return {
            msg : '',
            ChattingComponent : ChattingContent,
            isMounted : false,
            startToBottom : false,
        }
    },
    mounted(){
        this.isMounted = true;
    },
    methods : {
        async sendMsg(){
            if(this.msg === ''){
                return;
            }
            const temp = {
                roomName : this.data.roomName,
                msg : this.msg,
                userIdx : this.userData.userIdx,
            }
            try{
                await this.$store.dispatch('sendMessage', temp);
                this.msg = '';
            }catch(err){
                console.log(err);
            }
        },
        async quitChatting(){
            const data = {
                userIdx : this.userData.userIdx,
                roomName : this.data.roomName,
            }
            try{
                await this.$store.dispatch('quitChatting', data);
            }catch(err){
                console.log(err);
            }
        },
        minimizeChatting(){
            this.$store.dispatch('minimizeChatting');
            this.startToBottom = false;
        },
        recover(){
            this.$store.dispatch('maximizeChatting');
        }
    }
}
</script>


<style scoped>
.main{
    /* width: 300px; height: 500px;  position:relative; z-index: 1; */
    margin-left: 10px; 
    display: flex;
    flex-direction: row;
    align-items: flex-end;
}
.wrapper {
    width: 300px; height: 500px; background-color: #CFD8DC; justify-items: center; 
    position:relative;  border-radius: 25px; border: 1px solid rgba(0, 0, 0, .7);
    z-index: 1; padding-right: 20px; margin-left: 40px;
}
.minimizeWrapper {
    width: 150px; height: 50px; background-color: #CFD8DC; justify-items: center; text-align: center;
     position:static;  border-radius: 25px; border: 1px solid rgba(0, 0, 0, .7);
     z-index: 1; padding-right: 20px; margin-left: 40px;
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
     height: 320px; padding: 10px 10px 10px 10px;
}
.textInput{
     position:absolute; bottom : 15px;
}
.sendBtn{
    width: 20px;
}
</style>
