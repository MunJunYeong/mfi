
<template>
    <v-row justify='center' >
        <v-col cols='12'>
            <v-row justify='center' >
                <v-col cols='10'>
                    <div style="height: 120px; font-size : 2.2em;  padding-top : 35px">아이디어 추가하기</div>
                </v-col>
                <v-col cols='2' align="right">
                    <!-- <v-btn 
                    
                    style="height : 70px; width : 160px; margin-top : 40px; margin-right : 50px"
                    >등록하기
                    </v-btn> -->
                </v-col>
            </v-row>
            <v-row >
                <v-col cols='5'>
                    <v-text-field
                    label="제목 입력"
                    v-model="subject">
                    </v-text-field>
                </v-col>
            </v-row>

            <v-row justify='center' >
                <v-col cols='12'>
                    <!-- text editor -->
                    <div class="deitor" v-if="editor">
                        <menu-bar class="editor__header" :editor="editor" />
                        <br>
                        <editor-content class="editor_content" :editor="editor" v-model="content" />
                        
                    </div>
                </v-col>
            </v-row>
            <br><br><br><br>
            <v-row justify='center'>
                <v-col cols='4'>
                    <v-btn  block elvation="2" v-on:click="save">
                        아이디어 추가하기
                    </v-btn>
                </v-col>
                <v-col cols='4'>
                    <v-btn  block elvation="2" v-on:click="goIdeaPage">
                        아이디어 취소하기
                    </v-btn>
                </v-col>
            </v-row>

        </v-col>
    </v-row>
</template>
<script>
    import { Editor, EditorContent } from '@tiptap/vue-2'
    import StarterKit from '@tiptap/starter-kit'
    import MenuBar from '../../components/editer/MenuBar.vue'
    import axios from 'axios'
    // import jwt_decode from 'jwt-decode';

    let token = localStorage.getItem('accessToken');
    // const userIdx = jwt_decode(token);

    export default {
        name: 'AddIdea',
        props: [ ],
        components: {
            EditorContent,
            MenuBar,
        },

        data() {
            return {
                editor: null,
                content: '내용 적기',
                subject : '',
            }
        },

        created() {
            this.editor = new Editor({
                extensions: [
                    StarterKit,
                ],
                content: this.content,
                onUpdate: ({ editor }) => {
                    this.content = editor.getHTML();
                },
            })
        },

        beforeDestroy() {
            this.editor.destroy()
        },

        methods : {
            async save(){
                await axios.post('http://localhost:8080/idea',{
                    subject : this.subject,
                    content : this.content,
                }, {
                    headers : {
                        'Authorization' : token
                    }
                }).then(res => {
                    console.log(res.data);
                    if(res.data.message === 'no subject'){
                        alert('제목을 입력해주세요.');
                    } else if(res.data.message === 'no content'){
                        alert('내용을 입력해주세요.');
                    } else if(res.data.message === 'empty'){
                        alert('아이디어를 작성해주세요.');
                    }else {
                        alert("아이디어를 무사히 제출했습니다!");
                        location.href='#/idea'
                    }
                })
            },
            goIdeaPage(){
                let result = confirm("취소하시겠습니까 ?");
                if(result){
                    location.href='#/idea'
                }
                
            },
        }
    }
</script>

<style lang="scss" scoped>
.editor {
  display: flex;
  flex-direction: column;
  max-height: 400px;
  color: #0D0D0D;
  background-color: white;
  border: 3px solid #0D0D0D;
  border-radius: 0.75rem;

  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 3px solid #0D0D0D;
  }

  &__content {
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  

  
}
</style>
