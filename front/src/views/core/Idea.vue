<template>
    <v-container ref="boardContainer" >
        <br class="pc">
        <!-- pc tablet version -->
        <v-row justify='center' class="pc">
            <v-col cols='3'  >
                <div style=" height: 75px; " >
                    <p style="font-size: 1.5em;">모든아이디어</p> 
                    <p style="font-size: 0.8em;">검색결과 : {{totalItems && totalItems > 0? totalItems: 0}}개</p></div>
            </v-col>
            <v-col cols='2'></v-col>
            <router-link to="/add-idea">
                <v-col cols='1'  >
                    <v-btn block outlined  style="height : 60px" v-on:click="addIdea()">
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
            <v-col cols='2'  >
                <div style="">
                    <v-combobox outlined
                    v-model="modelDate"
                    :items="selectDate" 
                    @change="changeSorting"
                    >
                    </v-combobox>
                </div>
            </v-col>
        </v-row>

        <v-row justify='center' class="pc">
            <v-col cols='1' />
            <v-col cols='1' class="table">
                번호
            </v-col>
            <v-col cols='4' class="table">
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
            <v-col cols='2' />
            <v-col cols="5">
                <v-text-field v-model="searchSubject" label="Search by Title" 
                    v-on:keyup.enter  ="currentPage = 1; createPagination();" 
                />
            </v-col>
            <v-col cols="2"> 
                <v-btn small @click="currentPage = 1; createPagination();">
                Search
                </v-btn>
            </v-col>
        </v-row>
        <v-row v-if="joinRooms.length > 0"  class="chatting" id="pc_main">
            <Chatting v-for="(item,index) in this.joinRooms" :key ="index" 
                :data="item.data"
                :roomName = "item.roomName"
                :chatHistory = "item.chatHistory"
            />
        </v-row>
        <!-- mobile version -->
        <v-row justify='center' class="mobile" >  
            <v-spacer />  
            <v-col cols='7'  >
                <div style=" height: 75px; " >
                    <p style="font-size: 1em;">모든 아이디어</p> 
                    <p style="font-size: 0.8em;">검색결과 : {{totalItems && totalItems > 0? totalItems: 0}}개</p></div>
            </v-col>
            <v-col cols='3'>
                
            </v-col>
            <v-spacer />
        </v-row>

        <v-row justify='center' class="mobile">
            <v-spacer />
            <v-col cols='3' class="table">
                번호
            </v-col>
            <v-col cols='6' class="table" >
                제목
            </v-col>
            <v-col cols='3' class="table" >
                작성자
            </v-col>
            <v-spacer />
        </v-row>
        <v-row justify='center' class="mobile">
            <v-col cols='12'>
                <IdeaItem style="cursor:pointer"  v-for="(item, index) in ideaItem"  :key="index" 
                    :ideaIdx="item.ideaIdx"
                    :number="item.number"
                    :subject="item.subject" 
                    :nickName="item.user.nickName" 
                /> 
            </v-col>
        </v-row>
        <v-row justify='center' class="mobile">
            <v-spacer />
            <v-col cols="7">
                <v-text-field v-model="searchSubject" label="Search by Title"
                    v-on:keyup.enter  ="currentPage = 1; createPagination();" 
                />
            </v-col>
            <v-col cols="3"> 
                <v-btn small @click="currentPage = 1; createPagination();">
                Search
                </v-btn>
            </v-col>
            <v-spacer />
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
    import Chatting from '../../components/modal/Chatting.vue';
    export default {
        name: 'Idea',
        created() {
            this.createPagination();
        },
        components: {
            IdeaItem, Chatting
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
                nickName:'',
                currentPage : 1,
                searchSubject : '',         
                number : 0,
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
            totalItems : function(){
                const arrat= this.$store.getters.idea_get_total_items;
                return  arrat;
            },
            startPageIndex : function(){
                return ((Number(this.currentPage) - 1) * 6) + 1;
            },
            userData : function(){
                return this.$store.getters.auth_get_data;
            },
            joinRooms : function(){
                return this.$store.getters.get_join_room;
            }
        },
        
        methods: {
            alertErrorMessage (){
                alert('시스템 오류가 발생했습니다. 잠시 후 시도해주세요.');
                location.href='/home'; //새로고침
                return;
            },
            async createPagination(){
                let res;
                try{
                    res = await this.$store.dispatch('show_idea', {
                        page : this.currentPage,
                        subject : this.searchSubject,
                        userData : this.userData
                    })
                }catch(err){
                    console.log(err)
                }
                if(res === 'error'){
                    this.alertErrorMessage();
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
                let res;
                try{
                    res = await this.$store.dispatch('show_idea', {
                        page : this.currentPage,
                        subject : this.searchSubject,
                        role : 'winner',
                        order : 'ASC',
                        userData : this.userData
                    })
                }catch(err){
                    console.log(err);
                }
                if(res === 'error'){
                    this.alertErrorMessage();
                }
            },
            async winnerRecent(){
                let res;
                try{
                    res = await this.$store.dispatch('show_idea', {
                        page : this.currentPage,
                        subject : this.searchSubject,
                        role : 'winner',
                        order : 'DESC',
                        userData : this.userData
                    })
                }catch(err){
                    console.log(err);
                }
                if(res === 'error'){
                    this.alertErrorMessage();
                }
            },
            async allOld(){
                let res;
                try{
                    res = await this.$store.dispatch('show_idea', {
                        page : this.currentPage,
                        subject : this.searchSubject,
                        order : 'ASC',
                        userData : this.userData
                    })
                }catch(err){
                    console.log(err);
                }
                if(res === 'error'){
                    this.alertErrorMessage();
                }
            },
            async allRecent(){
                let res;
                try{
                    res = await this.$store.dispatch('show_idea', {
                        page : this.currentPage,
                        subject : this.searchSubject,
                        order : 'DESC',
                        userData : this.userData
                    })
                }catch(err){
                    console.log(err);
                }
                if(res === 'error'){
                    this.alertErrorMessage();
                }
            },
            addIdea(){ //add idea 버튼 클릭시 막아줌.
                if(!this.$store.getters.auth_get_token){
                    alert('로그인 후 아이디어를 추가해주세요!');
                }
            }
        },       
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
    /* 태블릿은 잘보임 */
}
@media all and (min-width:1024px) {
    .mobile{
        display: none;
    }
}
#icon{
    background-image: url('../../assets/logo.png');background-size: 100% 100%;
}
.table {
    border-top: black solid 1px; border-bottom: black solid 1px;text-align: center;
}
.chatting{
    position:fixed; bottom:50px; left: 100px;
}
</style>

