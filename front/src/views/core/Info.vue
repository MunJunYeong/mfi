<template>
    <v-container>
        <v-row class="pc">
            <v-col cols='3'>
                <br>
                <v-list>
                    <v-list-item-group v-model="model">
                        <v-list-item v-for="(item, i) in items" :key="i">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
            <v-col cols='9'  v-if="clickInfo()">
                <MyInfo />
            </v-col>
            <v-col cols='9' v-else >
                <MyIdea />
            </v-col>
        </v-row>
        <v-row v-if="joinRooms.length > 0"  id="chatting" class="pc">
            <Chatting v-for="(item,index) in this.joinRooms" :key ="index" 
                :data="item.data"
                :roomName = "item.roomName"
                :chatHistory = "item.chatHistory"
            />
        </v-row>
        <v-row class="mobile">
            <v-col cols='3'>
                <br>
                <v-list>
                    <v-list-item-group v-model="model">
                        <v-list-item v-for="(item, i) in items" :key="i">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
            <v-col cols='9'  v-if="clickInfo()">
                <MyInfo />
            </v-col>
            <v-col cols='9' v-else >
                <MyIdea />
            </v-col>
        </v-row>
    </v-container>    
</template>
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
    /* 태블릿은 잘보임 */
}
@media all and (min-width:1024px) {
    .mobile{
        display: none;
    }
}
#chatting{
    position:fixed; bottom:50px; left: 100px;
}
</style>
<script>
import MyInfo from '../../components/MyInfo.vue'
import MyIdea from '../../components/MyIdea.vue'
import Chatting from '../../components/modal/Chatting.vue';
export default {
    name : 'info',
    created() {
        
    },
    components: {
        MyInfo, MyIdea, Chatting
    },
    computed : {
        joinRooms : function(){
            return this.$store.getters.get_join_room;
        }
    },
    data() {
        return {
            items : [
                {
                    icon: 'mdi-inbox',
                    text: '정보',
                },
                {
                    icon: 'mdi-star',
                    text: '아이디어',
                },
            ],
            model: 0,
        }
    },
    methods: {
        clickInfo(){
            if(this.model === 0){
                return true;
            }else{
                return false;
            }
        },
    },
}
</script>