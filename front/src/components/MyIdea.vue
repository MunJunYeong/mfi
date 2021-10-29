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
            userData : this.$store.getters.auth_get_data,
            ideaItem :  [],
            ideaData : {},
            nickName:'',
            currentPage : 1,
            totalPages : 0,
            searchSubject : '',
            number : 0,
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
            
            this.ideaData = JSON.parse(JSON.stringify(this.$store.getters.idea_get_data));
            this.ideaItem = this.ideaData[0].ideas;
            this.totalPages = this.ideaData[0].totalPages;

            const startPageIndex = ((Number(this.currentPage) - 1) * 6) + 1;
                
            for(let i =0; i<this.ideaItem.length; i++){
                this.ideaItem[i].number = startPageIndex+ i;
            }

        },
        handlePageChange(value){
             this.currentPage = value;
             this.createPagination();
        },
    },
}
</script>