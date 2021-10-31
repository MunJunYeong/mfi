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
                등급조정
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
        :length="totalPages"
        @input="handlePageChange"
        >
        </v-pagination>
    </v-container>
</template>

<script>
import UserItem from '../../components/UserItem.vue'
export default {
    created() {
        console.log(1);
        this.createPagination();
    },
    components : {
        UserItem
    },
    watch : {
        // '$route' : 'createPagination'
    },
    data() {
        return {
            // userData : this.$store.getters.auth_get_data,
            userItemData : {},
            userItem : [],
            currentPage : 1,
            totalPages : 0,
            searchNickName : '',
            totalItems : 0,
        }
    },
    computed: {
        userData: function() {
            return this.$store.getters.auth_get_data;
        }
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
            this.userItemData = JSON.parse(JSON.stringify(this.$store.getters.user_get_data_admin));
            this.userItem = this.userItemData[0].user;
            this.totalPages = this.userItemData[0].totalPages;
            this.totalItems = this.userItemData[0].totalItems;
        },
        handlePageChange(value){
            this.currentPage = value;
            this.createPagination();
        },
    },
}
</script>
