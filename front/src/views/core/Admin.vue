<template>
    <v-container v-if="checkAdmin()">
        <br><br>
        <v-row justify='center'>
            <v-col cols='1' />
            <v-col cols='1' style=" border-top: black solid 1px; border-bottom: black solid 1px;text-align: center;">
                유저번호
            </v-col>
            <v-col cols='2' style=" border-top: black solid 1px; border-bottom: black solid 1px;text-align: center;">
                닉네임
            </v-col>
            <v-col cols='2' style=" border-top: black solid 1px; border-bottom: black solid 1px;text-align: center;" >
                등급
            </v-col>
            <v-col cols='3' style=" border-top: black solid 1px; border-bottom: black solid 1px;text-align: center;">
                올린 게시물 확인
            </v-col>
            <v-col cols='2' style=" border-top: black solid 1px; border-bottom: black solid 1px;text-align: center;" >
                등급 조정
            </v-col>
            <v-col cols='1' />
        </v-row>
        <v-row justify='center'>
            <v-col cols='12'>
                <UserItem v-for="(item, index) in this.userItem" :key="index"
                :userIdx="item.userIdx"
                :nickName="item.nickName"
                :role="item.role"
                />
            </v-col>
        </v-row>

        <v-row justify='center'>
            <v-col cols='2' />
            <v-col cols="5">
                <v-text-field v-model="searchNickName" label="유저 검색" 
                    v-on:keyup.enter ="currentPage = 1; createPagination();" 
                />
            </v-col>
            <v-col cols="2"> 
                <v-btn small @click="currentPage = 1; createPagination();">
                Search
                </v-btn>
            </v-col>
        </v-row>
        <v-pagination
            v-model="currentPage"
            :length="totalPages && totalPages >= 1? totalPages: 1"
            @input="handlePageChange" />

        <v-row v-if="joinRooms.length > 0"  class="chatting">
            <Chatting v-for="(item,index) in this.joinRooms" :key ="index" 
                :data="item.data"
                :roomName = "item.roomName"
                :chatHistory = "item.chatHistory"
            />
        </v-row>

    </v-container>
</template>
<style scoped>
.chatting{
    position:fixed; bottom:50px; left: 100px;
}
</style>
<script>
import UserItem from '../../components/UserItem.vue'
import Chatting from '../../components/modal/Chatting.vue';
export default {
    created() {
        this.createPagination();
    },
    components : {
        UserItem, Chatting
    },
    data() {
        return {
            currentPage : 1,
            searchNickName : '',
        }
    },
    computed: {
        userData: function() {
            return this.$store.getters.auth_get_data;
        },
        userItem : function(){
            return this.$store.getters.admin_get_user_items;
        },
        totalPages : function(){
            return this.$store.getters.admin_get_total_pages;
        },
        totalItems : function(){
            return this.$store.getters.admin_get_total_items;
        },
        joinRooms : function(){
            return this.$store.getters.get_join_room;
        }
    },
    methods: {
        checkAdmin(){
            if(this.userData.role === 'admin'){
                return true;
            }else {
                alert("관리자만 접근 가능한 페이지입니다.")
                history.back();
                return false;
            }
        },
        async createPagination(){
            let res;
            try{
                res = await this.$store.dispatch('get_user_list_admin', {
                    page : this.currentPage,
                    nickName : this.searchNickName
                })
            }catch(err){
                console.log(err)
            }
            if(res === undefined) return;
            if(res.message === 'force logout'){
                alert('다른 기기에서 로그인하여 로그아웃 되었습니다. 재 로그인 해주세요.');
                return;
            }
            if(res.message){
                alert(res.message); return;
            }


        },
        handlePageChange(value){
            this.currentPage = value;
            this.createPagination();
        },
    },
}
</script>
