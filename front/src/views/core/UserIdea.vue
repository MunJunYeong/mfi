<template>
    <v-container v-if="checkAdmin()">
        <br>
        <v-row justify='center'>
            <v-col cols='1' />
            <v-col cols='1' class="table">
                번호
            </v-col>
            <v-col cols='3' class="table">
                제목
            </v-col>
            <v-col cols='3' class="table">
                작성자
            </v-col>
            <v-col cols='2' class="table">
                게시일
            </v-col>
            <v-col cols='1' class="table"></v-col>
        </v-row>

        <v-row justify='center'>
            <v-col cols='12'>
                <IdeaItem style="cursor:pointer"  v-for="(item, index) in ideaItem"  :key="index" 
                :nickName="item.user.nickName" 
                :ideaIdx="item.ideaIdx" 
                :subject="item.subject" 
                :content="item.content"
                :created="item.created"
                :number="item.number"
                /> 
            </v-col>
        </v-row>

        <v-row justify='center'>
            <v-col cols='2' />
            <v-col cols="5">
                <v-text-field v-model="searchSubject" label="Search by Title"></v-text-field>
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
import IdeaItem from '../../components/IdeaItem.vue'

export default {
    name : 'UserIdea',
    created() {
        this.createPagination();
    },
    components: {
        IdeaItem
    },
    computed : {
        userData: function() {
            return this.$store.getters.auth_get_data;
        },
        ideaItem : function(){
            let tempIdea = this.$store.getters.idea_get_item;
            for(let i =0; i<tempIdea.length; i++){
                tempIdea[i].number = this.startPageIndex+ i;
            }
            return tempIdea;
        },
        totalPages : function(){
            return this.$store.getters.idea_get_total_pages;
        },
        totalItems : function(){
            return this.$store.getters.idea_get_total_items;
        },
        startPageIndex : function(){
            return ((Number(this.currentPage) - 1) * 6) + 1;
        },
    },
    data() {
        return {
            userIdx : this.$route.params.userIdx,
            currentPage : 1,
            searchSubject : '',
        }
    },
    methods: {
        async createPagination(){
                try{
                    await this.$store.dispatch('show_admin_user_idea', {
                        userIdx : this.userIdx,
                        page : this.currentPage,
                        subject : this.searchSubject,
                    })
                }catch(err){
                    console.log(err)
                }
                
            },
        handlePageChange(value){
            this.currentPage = value;
            this.createPagination();
        },
        checkAdmin(){
            if(this.userData.role === 'admin'){
                return true;
            }else {
                alert("관리자만 접근 가능한 페이지입니다.")
                history.back();
                return false;
            }
        },
    },
}
</script>