<template>
    <v-container>
        <v-row justify='center'>
            <v-col cols='4'>
                <div id="subject">
                    <h1>{{subject}}</h1>
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
                    <p id="nickName">닉네임 : {{nickName}}</p>
                    <p id="created">{{created}}</p>
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
            <v-col cols='9' >
                <p>{{content}}</p>
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
                <CommentItem v-for="(item,index) in this.CommentItem" :key="index"
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
                    {{currentNickName}}
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
import axios from 'axios';
import CommentItem from '../../components/CommentItem.vue';
import jwt_decode from 'jwt-decode'

let token = localStorage.getItem('accessToken');

    export default {
        name: 'IdeaClick',
        created(){
            this.showClickIdea();
            this.showComment();
        },
        components : {
            CommentItem
        },
        props: [
            'ideaIdx',
        ],
        data(){
            return {
                subject : '',
                nickName : '',
                created : '',
                content : '',
                userData :  jwt_decode(localStorage.getItem('accessToken')),
                currentNickName : '',
                writeComment : '',
                CommentItem : [
                ],
            }
        },
        mounted(){
            this.currentNickName = this.userData.nickName;
        },
        methods : {
            async showClickIdea(){
                await axios.get('http://localhost:8080/idea/idea-click?ideaIdx='+this.ideaIdx, 
                {
                    headers : {
                        'Authorization' : token
                    }
                }).then(res => {
                    // console.log(res.data.data[0].user)
                    this.subject = res.data.data[0].subject;
                    this.nickName = res.data.data[0].user.nickName;
                    this.created = res.data.data[0].created;
                    this.content = res.data.data[0].content;
                    return;
                })
            },
            async showComment(){
                await axios.get('http://localhost:8080/comment?ideaIdx=' + this.ideaIdx, 
                {
                    headers : {
                        'Authorization' : token
                    }
                }).then(res => {
                    this.CommentItem = res.data.data;
                    return;
                })
            },
            
            async enrollComment(){
                let confirmComment = confirm('댓글을 추가하겠습니까?');
                if (confirmComment){
                    await axios.post('http://localhost:8080/comment',
                    {
                        comment : this.writeComment,
                        ideaIdx : this.ideaIdx
                    },
                    {
                        headers : {
                            'Authorization' : token
                    }    
                    }).then(res => {
                        console.log(res.message)
                        // this.$router.go();
                    })
                }
            }
                
        }

    }


</script>
<style>
    #subject {
         line-height: 70px;
    }
    #profile{
        width: 20%; height: 100%; background-image: url('../../assets/profile.png' ); background-size: 100% 100%; float: left;
        
    }
    #nickName {

    }
    #created {

    }
    #modifyBtn{
        height: 50px;
    }
    #deleteBtn{
        height: 50px;
    }

</style>

