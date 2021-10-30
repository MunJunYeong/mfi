<template>
    <v-container ref="boardContainer" >
        <br>
        <v-row justify='center'>
            <v-col cols='1' />
            <v-col cols='3'  >
                <div style=" height: 75px; " >
                    <p style="font-size: 1.5em;">모든아이디어</p> 
                    <p style="font-size: 0.8em;">검색결과 : {{totalItems}}개</p></div>
            </v-col>
            <v-col cols='2'></v-col>
            <router-link to="/add-idea">
                <v-col cols='1'  >
                    <v-btn block outlined  style="height : 60px">
                        아이디어 내기
                    </v-btn>
                </v-col>
            </router-link>
            <v-col cols='2'  >
                <div style="">
                    <v-combobox outlined
                    v-model="modelIdea"
                    :items="selectIdea" 
                    @change="changeSorting"
                    >
                    </v-combobox>
                </div>
            </v-col>
            <v-col cols='1'  >
                <div style="">
                    <v-combobox outlined
                    v-model="modelDate"
                    :items="selectDate" 
                    @change="changeSorting"
                    >
                    </v-combobox>
                </div>
            </v-col>
            <v-col cols='1'></v-col>
        </v-row>
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
        :length="totalPages"
        @input="handlePageChange"
        >
        </v-pagination>
    </v-container>
</template>
<script>
    import IdeaItem from '../../components/IdeaItem.vue'
    
    export default {
        name: 'Idea',
        created() {
            this.createPagination();
        },
        components: {
            IdeaItem
        },
        mounted() {
            
        },
        props: {

        },
        computed : {
            // ideaData : function(){
            //     return JSON.parse(JSON.stringify(this.$store.getters.idea_get_data));
            // },
            // ideaItem : function(){
            //     return this.ideaData[0].ideas;
            // },
            // totalPages : function(){
            //     return this.ideaData[0].totalPages;
            // },
            // totalItems : function(){
            //     return this.ideaData[0].totalItems;
            // },
            
        },
        data() {
            return {
                modelIdea: ['모든 아이디어'],
                modelDate : ['최신 순'],
                selectIdea: [
                  '모든 아이디어',
                  '위너 아이디어'
                ],
                selectDate: [
                  '최신 순',
                  '오래된 순'
                ],
                ideaData : {},
                ideaItem :  [],
                nickName:'',
                currentPage : 1,
                totalPages : 0,
                searchSubject : '',
                totalItems : 0,
                number : 0,
            }
        },
        methods: {
            async createPagination(){
                try{
                    await this.$store.dispatch('show_idea', {
                        page : this.currentPage,
                        subject : this.searchSubject,
                    })
                }catch(err){
                    console.log(err)
                }
                
                this.ideaData = JSON.parse(JSON.stringify(this.$store.getters.idea_get_data));
                this.ideaItem = this.ideaData[0].ideas;
                this.totalPages = this.ideaData[0].totalPages;
                this.totalItems = this.ideaData[0].totalItems;

                const startPageIndex = ((Number(this.currentPage) - 1) * 6) + 1;
                
                for(let i =0; i<this.ideaItem.length; i++){
                    this.ideaItem[i].number = startPageIndex+ i;
                }
                
            },
            handlePageChange(value){
                 this.currentPage = value;
                 this.createPagination();
            },
            changeSorting(){
                if(this.modelIdea === '위너 아이디어'){
                    if(this.modelDate === '오래된 순'){
                        //위너아이디어 + 오래된순
                        this.winnerOld();
                    }else{
                    //위너아이디어 + 최신순
                        this.winnerRecent();
                    }
                }else {
                    if(this.modelDate === '오래된 순'){
                        //모든아이디어 + 오래된순
                        this.allOld();               
                    }else{
                        //모든아이디어 + 최신순
                        this.allRecent();
                    }
                }
            },
            async winnerOld(){
                try{
                    await this.$store.dispatch('show_idea', {
                        page : this.currentPage,
                        subject : this.searchSubject,
                        role : 'winner',
                        order : 'ASC',
                    })
                }catch(err){
                    console.log(err);
                }
            },
            async winnerRecent(){
                try{
                    await this.$store.dispatch('show_idea', {
                        page : this.currentPage,
                        subject : this.searchSubject,
                        role : 'winner',
                        order : 'DESC',
                    })
                }catch(err){
                    console.log(err);
                }
            },
            async allOld(){
                try{
                    await this.$store.dispatch('show_idea', {
                        page : this.currentPage,
                        subject : this.searchSubject,
                        order : 'ASC',
                    })
                }catch(err){
                    console.log(err);
                }
            },
            async allRecent(){
                try{
                    await this.$store.dispatch('show_idea', {
                        page : this.currentPage,
                        subject : this.searchSubject,
                        order : 'DESC',
                    })
                }catch(err){
                    console.log(err);
                }
            },
        },       
    }
</script>
<style >
    #icon{
        background-image: url('../../assets/logo.png');background-size: 100% 100%;
    }
    .table {
        border-top: black solid 1px; border-bottom: black solid 1px;text-align: center;
    }
</style>