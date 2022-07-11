<template>
    <v-container>
        <v-card>
            <br>
            <v-row justify='center'>
                <v-col cols="8" class="nickname"  v-on:click="chatting">
                    {{source.nickName}}
                </v-col>
            </v-row>
            <v-spacer />
            <br>
        </v-card>

    </v-container>

    
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
        async chatting(){
            if(this.userData.userIdx === this.source.userIdx){
                alert('본인한테는 채팅할 수 없습니다.'); return;
            }
            const tempRoomName = this.userData.userIdx + "-" + this.source.userIdx;
            //현재 채팅하고 있는 사람인지 확인
            const checkRoom = this.$store.getters.get_have_room(tempRoomName);
            if(checkRoom !== undefined) {
                alert('현재 대화중입니다.'); return;
            }
            const flag = confirm('채팅을 신청하겠습니까?');
            if(!flag)return;
            try {
                await chatting.toApplyChatting(this.source.userIdx);
            }catch(err){
                console.log(err);
            }
        }
    }
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

