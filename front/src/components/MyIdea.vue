<template>
    <v-container>
        <!-- pc version -->
        <br class="pc"><br class="pc">
        <v-row justify='center' class="pc">
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
        <v-row justify='center' class="pc">
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
        <v-row justify='center' class="pc">
            <v-col cols="5">
                <v-text-field v-model="searchSubject" label="Search by Title"
                    v-on:keyup.enter ="currentPage = 1; createPagination();" 
                />
            </v-col>
            <v-col cols="2"> 
                <v-btn small @click="currentPage = 1; createPagination();">
                Search
                </v-btn>
            </v-col>
        </v-row>
        <v-pagination class="pc"
        v-model="currentPage"
        :length="totalPages"
        @input="handlePageChange"
        >
        </v-pagination>

        <!-- mobile version -->
        <v-row justify='center' class="mobile">
            <v-col cols='3' style="border-top: black solid 1px; border-bottom: black solid 1px;text-align: center; font-size: 0.8em;">
                번호
            </v-col>
            <v-col cols='5' style="border-top: black solid 1px; border-bottom: black solid 1px;text-align: center; font-size: 0.8em;">
                제목
            </v-col>
            <v-col cols='4' style="border-top: black solid 1px; border-bottom: black solid 1px; text-align: center; font-size: 0.8em;">
                작성자
            </v-col>
        </v-row>
        <v-row justify='center' class="mobile">
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
        <v-row justify='center' class="mobile">
            <v-col cols="8">
                <v-text-field v-model="searchSubject" label="Search by Title"
                    v-on:keyup.enter ="currentPage = 1; createPagination();" 
                />
            </v-col>
            <v-col cols="4"> 
                <v-btn small @click="currentPage = 1; createPagination();">
                Search
                </v-btn>
            </v-col>
        </v-row>
        <v-pagination class="mobile"
        v-model="currentPage"
        :length="totalPages"
        @input="handlePageChange"
        >
        </v-pagination>

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
</style>
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
            let res;
            try{
                res = await this.$store.dispatch('show_my_idea', {
                    page : this.currentPage,
                    subject : this.searchSubject,
                    userIdx : this.userData.userIdx
                })
            }catch(err){
                console.log(err)
            }
            if(res === 'force logout'){
                alert('다른 기기에서 로그인하여 로그아웃 되었습니다. 재 로그인 해주세요.')
                location.href='/home'; //새로고침
                return;
            }

        },
        handlePageChange(value){
             this.currentPage = value;
             this.createPagination();
        },
    },
}
</script>