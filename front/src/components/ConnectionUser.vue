<template>
    <v-card>
        <br>
        <v-row justify='center' class="pc" >
            <v-col cols="8" class="nickname"  v-on:click="chatting">
                {{source.nickName}}
                <!-- {{nickName}} -->
            </v-col>
        </v-row>
        <v-row justify='center' class="mobile" >
            
        </v-row>
        <br>
    </v-card>
    
</template>
<script>
import {chatting} from '../services';

export default {
    name: 'ConnectionUser',
    props: {
        index : {
            type : Number
        },
        source : {
            type : Object,
            default(){
                return{}
            }
        }
    },
    computed: {
        userData : function(){
            return this.$store.getters.auth_get_data;
        },
    },
    components: {
    },
    created() {
    },
    data() {
        return {
            
        }
    },
    methods : {
        chatting(){
            if(this.userData.userIdx === this.source.userIdx){
                // alert('본인한테는 채팅할 수 없습니다.'); return;
            }
            const flag = confirm('채팅을 신청하겠습니까?');
            if(!flag)return;
            try {
                chatting.toApplyChatting(this.source.userIdx);
            }catch(err){
                console.log(err);
            }
        }
    }
}

</script>
<style>
@media all and (max-width:767px) {
    .pc{
        display: none;
    }
}
@media all and (max-width:1023px) and (min-width:767px) {
    .mobile{
        display: none;
    }
}
@media all and (min-width:1024px) {
    .mobile{
        display: none;
    }
}
.square{
    position: relative;
}
.role{
    position: absolute;
  width: 100%;
  height: 100%;
}
.nickname{
    text-align: center;
}
</style>

