<template>
    <v-container>
        <v-row justify='center'>
            <v-col cols='4'>
                <div id="subject">
                    <h1>{{ideaData.subject}}</h1>
                    </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols='1'>
                <router-link to="/add-idea">
                    <v-btn style="height : 70px"
                    block outlined
                    >아이디어 내기
                    </v-btn>
                </router-link>
            </v-col>
            
        </v-row>

        <v-row justify='center'>
            <v-col cols='3'>
                <div id="profile"></div>
                <div style="float : left; width: 7%; height: 100%;"></div>
                <div style="float : left; width: 73%; height: 100%;">
                    <p id="nickName">닉네임 : {{ideaData.user.nickName}}</p>
                    <p id="created">{{ideaData.created}}</p>
                </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols='1'>
                <v-btn id="modifyBtn"
                block outlined
                >수정
                </v-btn>
                
            </v-col>
            <v-col cols='1'>
                <v-btn id="deleteBtn"
                block outlined
                >삭제
                </v-btn>
            </v-col>
        </v-row>
        
        <!-- 내용 보이는 곳 -->
        <v-row justify='center'>
            <v-col cols='9'   >
                <div>
                    {{ideaData.content}}
                </div>
                <p></p>
            </v-col>
        </v-row>
        <v-row justify='center'>
            <v-col cols='9' >
                <v-col cols='3'>
                    <h2>댓글</h2>
                </v-col>
            </v-col>
        </v-row>
        
        <!-- 댓글내용들 -->
        <v-row justify='center'>
            <v-col cols='9'>
                <CommentItem v-for="(item,index) in this.commentData" :key="index"
                :nickName = "item.user.nickName"
                :comment = "item.comment"
                :created = "item.created"
                />
            </v-col>
        </v-row>
        
        <!-- 댓글적는곳 -->
        <v-row justify='center'>
            <v-spacer />
            <v-col cols='1'>
                <div style="text-align: center; font-weight : bold; height : 55px; line-height : 55px" >
                    {{userData.nickName}}
                </div>
            </v-col>
            <v-col cols='7' >
                <v-text-field
                outlined
                label = ''
                v-model="writeComment"
                >
                </v-text-field>
            </v-col>
            <v-col cols='1'>
                <v-btn id="enrollBtn" v-on:click="enrollComment"
                block 
                >등록
                </v-btn>    
            </v-col>
            
            <v-spacer />
        </v-row>
    </v-container>
    
</template>
<script>
import CommentItem from '../../components/CommentItem.vue';

    export default {
        name: 'IdeaClick',
        created(){
            this.initialize();
        },
        components : {
            CommentItem
        },
        props: [
            'ideaIdx',
        ],
        data(){
            return {
                // subject : '',
                ideaData : {},
                commentData : [],
                userData : {},
                writeComment : '',
                nickName: ''
            }
        },
        methods : {
            initialize(){
                this.showIdea();
                this.showComment();
                this.userData = this.$store.getters.auth_get_data[0];
                
            },
            async showIdea(){
                try{
                    await this.$store.dispatch('click_idea',{
                        ideaIdx : this.ideaIdx
                    })
                    this.ideaData = this.$store.getters.click_idea_get_data[0];
                }catch(err){
                    console.log(err);
                }
                
            },

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
            
            async enrollComment(){
                let confirmComment = confirm('댓글을 추가하겠습니까?');
                if (confirmComment){
                    try{
                        await this.$store.dispatch('add_comment', {
                            comment : this.writeComment,
                            ideaIdx : this.ideaIdx
                        })
                    }catch(err){
                        console.log(err);
                    }
                }
            }
                
        }

    }


</script>
<style>
    #subject {
         line-height: 40px;
    }
    #profile{
        width: 20%; height: 100%; background-image: url('../../assets/profile.png' ); background-size: 100% 100%; float: left;
        
    }
    /* #nickName {

    }
    #created {

    } */
    #modifyBtn{
        height: 50px;
    }
    #deleteBtn{
        height: 50px;
    }

</style>

