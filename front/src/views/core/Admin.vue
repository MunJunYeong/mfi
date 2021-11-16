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
                <UserItem v-for="(item, index) in userItem" :key="index"
                :userIdx="item.userIdx"
                :nickName="item.nickName"
                :role="item.role"
                />
            </v-col>
        </v-row>

        <v-row justify='center'>
            <v-col cols='2' />
            <v-col cols="5">
                <v-text-field v-model="searchNickName" label="유저 검색"></v-text-field>
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
        @input="handlePageChange"
        >
        </v-pagination>
    </v-container>
</template>

<script>
import UserItem from '../../components/UserItem.vue'
export default {
    created() {
        this.createPagination();
    },
    components : {
        UserItem
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
    },
    methods: {
        checkAdmin(){
            if(this.userData.role === 'admin'){
                return true;
            }else {
                return false;
            }
        },
        async createPagination(){
            try{
                await this.$store.dispatch('get_user_list_admin', {
                    page : this.currentPage,
                    nickName : this.searchNickName
                })
            }catch(err){
                console.log(err)
            }
        },
        handlePageChange(value){
            this.currentPage = value;
            this.createPagination();
        },
    },
}
</script>
