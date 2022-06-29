<template>
    <v-container >
        <v-container class="pc">
            <!-- <v-progress-circular v-if="completeLoading"
            indeterminate
            color="green"
            ></v-progress-circular> -->
            <!-- pc/ tablet version -->
            <v-row justify='center'  >
                <v-col cols='2' />
                <v-col cols='4'>
                    <div id="subject">
                        <h2>{{ideaData.subject}}</h2>
                        </div>
                </v-col>
                <v-spacer />
                <v-col cols='1'>
                    <router-link to="/add-idea">
                        <v-btn style="height : 70px"
                        block outlined
                        >아이디어 내기
                        </v-btn>
                    </router-link>
                </v-col>
                <v-col cols='2' />
            </v-row>
            <v-row justify='center' >
                <v-col cols='2' />
                <v-col cols='4'>
                    <div style="float : left; width: 73%; height: 100%;">
                        <p id="nickName" v-if="ideaData.user">닉네임 : {{ideaData.user.nickName}}</p>
                        <p id="created">{{createdAt}}</p>
                    </div>
                </v-col>
                <v-spacer />
                <v-col cols='1' v-if="authFlag">
                    <v-btn id="modifyBtn" v-on:click="modifyBtn()"
                    block outlined
                    >수정
                    </v-btn>
                </v-col>
                <v-col cols='1'  v-if="authFlag">
                    <v-btn id="deleteBtn" v-on:click="deleteBtn()"
                    block outlined
                    >삭제
                    </v-btn>
                </v-col>
                <v-col cols='1' />
            </v-row>
            <!-- 내용 보이는 곳 -->
            <br ><br ><br ><br >

            

            <v-row justify='center' >
                <v-col cols='8' v-if="contentFlag">
                    <Viewer ref="toastViewer" height="500px"  style="font-size:2em;" />
                </v-col>
                <v-col cols='8' v-else>
                <TextEditor :ideaIdx="ideaIdx" :ideaData = "ideaData" :contentFlag = "contentFlag"
                    @child="successModify" />
                </v-col>
            </v-row>
            <br ><br >
            <v-row justify='center' >
                <v-col cols='8' >
                    <v-col cols='3'>
                        <h2>댓글</h2>
                    </v-col>
                </v-col>
            </v-row>
            
            <!-- 댓글내용들 -->
            <v-row justify='center' >
                <v-col cols='9' >
                    <CommentItem v-for="(item,index) in this.commentData" :key="index"
                    :nickName = "item.user.nickName"
                    :comment = "item.comment"
                    :created = "item.created"
                    />
                </v-col>
                
            </v-row>
            <!-- 댓글적는곳 -->
            <br ><br ><br >
            <v-row justify='center' >
                <v-spacer />
                <v-col cols='2'>
                    <div style="text-align: center; font-weight : bold; height : 55px; line-height : 55px" >
                        {{userData.nickName}}
                    </div>
                </v-col>
                <v-col cols='5' >
                    <v-text-field
                    outlined
                    label = ''
                    v-model="writeComment"
                    v-on:keyup.enter ="enrollComment" 
                    />
                </v-col>
                <v-col cols='1'>
                    <v-btn id="enrollBtn" v-on:click="enrollComment"
                    block 
                    >등록
                    </v-btn>    
                </v-col>
                <v-spacer />
            </v-row>
            <v-row v-if="joinRooms.length > 0"  class="chatting">
                <Chatting v-for="(item,index) in this.joinRooms" :key ="index" 
                    :data="item.data"
                    :roomName = "item.roomName"
                    :chatHistory = "item.chatHistory"
                />
            </v-row>
        </v-container>
        <!-- mobile version  -->
        <!-- 제목 -->
        <v-container class="mobile">
            <v-row justify='center'  >
                <v-spacer />
                <v-col cols='10'>
                    <div id="subject">
                        <h2>{{ideaData.subject}}</h2>
                        </div>
                </v-col>
                <v-spacer />
            </v-row>

            <v-row justify='center' >
                <v-col cols='1'></v-col>
                <v-col cols='8'>
                    <p id="nickName" v-if="ideaData.user">닉네임 : {{ideaData.user.nickName}}</p>
                    <p id="created">{{createdAt}}</p>
                </v-col>
                <!-- <v-col cols='2' v-if="authFlag">
                    <v-btn id="modifyBtn" v-on:click="modifyBtn()"
                    block outlined
                    >수정
                    </v-btn>
                </v-col> -->
                <v-col cols='2'  v-if="authFlag">
                    <v-btn id="deleteBtn" v-on:click="deleteBtn()"
                    block outlined
                    >삭제
                    </v-btn>
                </v-col>
                <v-spacer />           
            </v-row>

            <br ><br >
            <br ><br >
            <v-row justify='center' >
                <v-col cols='1' />
                <v-col cols='3'>
                    <h3>댓글</h3>
                </v-col>
                <v-spacer />
            </v-row>
            <v-row justify='center' >
                <v-col cols='1' />
                <v-col cols='10' >
                    <CommentItemMobile v-for="(item,index) in this.commentData" :key="index"
                    :nickName = "item.user.nickName"
                    :comment = "item.comment"
                    :created = "item.created"
                    />
                </v-col>
                <v-spacer />
            </v-row>
            <br ><br ><br >
            <v-row justify='center' >

                <v-col cols='4'>
                    <div style="text-align: center; font-weight : bold; height : 55px; line-height : 55px" >
                        {{userData.nickName}}
                    </div>
                </v-col>
                <v-col cols='6' >
                    <v-text-field
                    outlined
                    label = ''
                    v-model="writeComment"
                    v-on:keyup.enter ="enrollComment" 
                    />
                </v-col>
                <v-col cols='2'>
                    <v-btn id="enrollBtn" v-on:click="enrollComment"
                    block 
                    >등록
                    </v-btn>    
                </v-col>
                <v-spacer />
            </v-row>
        </v-container>
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
#subject {
     line-height: 40px;
}
#profile{
    width: 20%; height: 100%; background-image: url('../../assets/profile.png' ); background-size: 100% 100%; float: left;
    
}
#modifyBtn{
    height: 50px;
}
#deleteBtn{
    height: 50px;
}
.chatting{
position:fixed; bottom:50px; left: 100px;
}

</style>
<script>
import CommentItem from '../../components/CommentItem.vue';
import CommentItemMobile from '../../components/CommentItemMobile.vue';
import {Viewer} from '@toast-ui/vue-editor'
import TextEditor from '../../components/editor/ModifyTextEditor.vue'
import moment from 'moment';
import Chatting from '../../components/modal/Chatting.vue';
moment.lang('ko', {
    weekdaysShort: ["일","월","화","수","목","금","토"],
});

    export default {
        name: 'IdeaClick',
        created(){
            this.initialize();
        },
        mounted(){
           
        },
        computed: {
            createdAt() {
                return moment(this.ideaData.created).format("YY-MM-DD (ddd)  HH : mm");
            },
            ideaData : function(){
                return this.$store.getters.click_idea_get_data;
            },
            userData : function(){
                return this.$store.getters.auth_get_data;
            },
            joinRooms : function(){
                return this.$store.getters.get_join_room;
            }
        },
        components : {
            CommentItem, CommentItemMobile,
            Viewer,
            TextEditor, Chatting
        },
        data(){
            return {
                commentData : [],
                writeComment : '',
                nickName: '',
                ideaIdx: this.$route.params.ideaIdx,
                authFlag: false,
                contentFlag : true,
                // completeLoading: true
            }
        },
        methods : {
            async initialize(){
               await this.showIdea();
               await this.showComment();
               this.checkAuth();
            },
            successModify(success){
                this.contentFlag = success;
                this.showIdea();
            },
            modifyBtn(){
                this.contentFlag = false;
            },
            async showIdea(){
                try{
                    await this.$store.dispatch('click_idea',{
                        ideaIdx : this.ideaIdx,
                        userIdx : this.userData.userIdx
                    })
                    this.setContent(this.ideaData.content);
                }catch(err){
                    console.log(err);
                }
            },
            setContent(content) {
              this.$refs.toastViewer.invoke('setMarkdown', content)
            },
            //댓글보여주기
            async showComment(){                
                try{
                    await this.$store.dispatch('idea_comment',{
                        ideaIdx : this.ideaIdx
                    })
                    this.commentData = this.$store.getters.comment_get_data;
                }catch(err){
                    console.log(err);
                }
                
            },
            //등록버튼
            async enrollComment(){
                if(!this.writeComment){
                    alert('댓글을 입력해주세요.'); return;
                }
                let confirmComment = confirm('댓글을 추가하겠습니까?');
                if (confirmComment){
                    try{
                        await this.$store.dispatch('add_comment', {
                            comment : this.writeComment,
                            ideaIdx : this.ideaIdx
                        })
                        this.writeComment = '';
                        this.showComment();
                    }catch(err){
                        console.log(err);
                    }
                }
            },
            //게시물 삭제 버튼
            async deleteBtn(){
                let confirmDeleteIdea = confirm('게시물을 삭제하겠습니까?(삭제를 한 후에는 돌릴 수 없습니다.)');
                if(confirmDeleteIdea){
                    try{
                        await this.$store.dispatch('delete_idea', {
                            ideaIdx : this.ideaData.ideaIdx
                        })
                        history.back();
                    }catch(err){
                        console.log(err);
                    }
                }

            },
            //유저와 아이디어유저가 같은지 확인
            checkAuth(){
                if(this.userData.userIdx === this.ideaData.user.userIdx){
                    this.authFlag = true;
                }else if(this.userData.role === 'admin'){
                    this.authFlag = true;
                }
                else{
                    this.authFlag = false;
                }
            }
        }

    }


</script>


