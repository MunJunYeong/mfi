<template>
    <v-container>
        <br><br>
        <v-row justify='center'>
            <v-col cols='1' />
            <v-col cols='1' style="border-top: black solid 1px; border-bottom: black solid 1px;text-align: center;">
                번호
            </v-col>
            <v-col cols='3' style="border-top: black solid 1px; border-bottom: black solid 1px;text-align: center;">
                제목
            </v-col>
            <v-col cols='3' style="border-top: black solid 1px; border-bottom: black solid 1px;text-align: center;">
                작성자
            </v-col>
            <v-col cols='2' style="border-top: black solid 1px; border-bottom: black solid 1px;text-align: center;">
                게시일
            </v-col>
            <v-col cols='1'></v-col>
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
        :length="totalPages"
        @input="handlePageChange"
        >
        </v-pagination>
    </v-container>
</template>
<script>
import IdeaItem from './IdeaItem.vue'

export default {
    name : 'MyIdea',
    created(){
        this.createPagination();
    },
    components : {
        IdeaItem
    },
    data() {
        return {
            nickName:'',
            currentPage : 1,
            searchSubject : '',
        }
    },
    computed : {
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
        startPageIndex : function(){
            return ((Number(this.currentPage) - 1) * 6) + 1;
        },
        userData : function(){
            return this.$store.getters.auth_get_data;
        }
    },
    methods: {
        async createPagination(){
            try{
                await this.$store.dispatch('show_my_idea', {
                    page : this.currentPage,
                    subject : this.searchSubject,
                    userIdx : this.userData.userIdx
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