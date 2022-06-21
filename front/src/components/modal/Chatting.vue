<template>
    <v-container  class="wrapper">
        <v-row >
            {{userName}}
        </v-row>
        <br> <br>
        <v-row>
            aa
        </v-row>
        <v-row class="footer">
            <v-col cols="9">
                <v-text-field
                label="내용 입력"
                v-model="msg"
                hide-details="auto"
                />
            </v-col>
            <v-col cols="2">
                <v-btn v-on:click="sendMsg">
                    전송
                </v-btn>
            </v-col>
            <v-col cols="1">
            </v-col>
        </v-row>
        
    </v-container>

</template>
<script>
/* eslint-disable */
export default {
    created () {
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
            console.log(res)
            return res;
            
            // const userData = new Promise((resolve, reject)=> {
            //     resolve(this.$store.getters.auth_get_data);
            // })
            // userData.then((userData)=> {
            //     const a = this.data.nickName;
            //     const b= this.data.target.nickName;
            //     console.log(this.data)
            //     let res;
            //     // userData.nickName === a ? res =b : res = a;
            //     return res;
            // })
        },
    },
    data() {
        return {
            msg : '',
        }
    }, 
    methods : {
        async sendMsg(){
            console.log(this.data)
            try{
                // await this.$store.dispatch('sendMessage', this.msg);
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>


<style scoped>
    .wrapper {
        width: 300px; height: 500px; background-color: yellow; justify-items: center;
        position:relative; 
        z-index: 1;
    }
    .footer{
         position:absolute; bottom:0px;
    }
</style>
