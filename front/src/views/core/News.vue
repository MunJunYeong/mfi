<template>
    <v-container>
        <v-container class="pc">
            <br>
            <v-row justify='center'>
                <v-spacer />
                <v-col cols='12' >
                    <v-row>
                        <v-col cols='12'>
                            주요 뉴스
                        </v-col>
                    </v-row>
                    <v-row>
                        <NewsItem  v-for="(item, index) in newsItem"  :key="index"
                        :tit="item.tit"
                        :subcontent="item.subcontent"
                        :dt="item.dt"
                        :ohnm="item.ohnm"
                        :oid="item.oid"
                        :aid="item.aid"
                        />
                    </v-row>
                </v-col>
                <v-spacer />
            </v-row>
            <v-row v-if="joinRooms.length > 0"  id="chatting" class="pc">
                <Chatting v-for="(item,index) in this.joinRooms" :key ="index" 
                    :data="item.data"
                    :roomName = "item.roomName"
                    :chatHistory = "item.chatHistory"
                />
            </v-row>
        </v-container>
        <v-container class="mobile">
            <br>
            <v-row justify='center'>
                <v-spacer />
                <v-col cols='12' >
                    <v-row>
                        <v-col cols='12'>
                            주요 뉴스
                        </v-col>
                    </v-row>
                    <v-row>
                        <NewsItem  v-for="(item, index) in newsItem"  :key="index"
                        :tit="item.tit"
                        :subcontent="item.subcontent"
                        :dt="item.dt"
                        :ohnm="item.ohnm"
                        :oid="item.oid"
                        :aid="item.aid"
                        />
                    </v-row>
                </v-col>
                <v-spacer />
            </v-row>
        </v-container>
    </v-container>
</template>
<script>
import NewsItem from '../../components/NewsItem.vue'
import Chatting from '../../components/modal/Chatting.vue';
export default {
    components: {
        NewsItem, Chatting
    },
    data(){
        return {

        }
    },
    created (){
        this.getNewsItem();
    },
    computed : {
        newsItem : function(){
            return this.$store.getters.get_news_item;
        },
        joinRooms : function(){
          return this.$store.getters.get_join_room;
      }
    },
    methods : {
        async getNewsItem(){
            try{
              await this.$store.dispatch('get_news', {
                  
              })  
            }catch(err){
                console.log(err);
            }
        },
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
#chatting{
    position:fixed; bottom:50px; left: 100px;
}
</style>