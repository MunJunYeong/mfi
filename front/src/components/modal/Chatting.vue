<template>
    <v-container  class="wrapper">
        <v-row >
            userName
            <!-- {{userName}} -->
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

export default {
    data(){
        return{
            msg : ''
        }
    },
    props : [
        'data'
    ],
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
