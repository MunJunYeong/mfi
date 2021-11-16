<template>
    <v-container>
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
                :adminFlag="adminFlag"
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
            ideaItem : function(){
                return this.$store.getters.idea_get_item
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
            adminFlag : true,
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
                for(let i =0; i<this.ideaItem.length; i++){
                    this.ideaItem[i].number = this.startPageIndex+ i;
                }
            },
            handlePageChange(value){
                this.currentPage = value;
                this.createPagination();
            },
    },
}
</script>