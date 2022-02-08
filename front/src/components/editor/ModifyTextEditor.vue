<template>
    <v-container>
        <v-row >
            <v-col cols='5'>
                <v-text-field
                label="제목 입력"
                v-model="subject">
                </v-text-field>
            </v-col>
        </v-row>
        <Editor :initialValue="editorText" ref="toastEditor" initialEditType="wysiwyg"  height="500px" />

        <v-row justify='center'>
            <v-col cols='4'>
                <v-btn  block elvation="2" v-on:click="modify">
                    아이디어 수정하기
                </v-btn>
            </v-col>
            <v-col cols='4'>
                <v-btn  block elvation="2" v-on:click="goIdeaPage">
                    수정 취소하기
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    
</template>
<script>
import 'codemirror/lib/codemirror.css'; 
import '@toast-ui/editor/dist/toastui-editor.css'; 
import { Editor } from '@toast-ui/vue-editor';


export default {
    nama : 'TextEditor',
    created() {

    },
    props : [
        'ideaIdx',
        'ideaData',
        'contentFlag',
    ],
    data() {
        return {
            editorText : this.ideaData.content,
            subject : this.ideaData.subject,
            changeFlag : false,
        }
    },
    components : {
        Editor
    },
    methods: {
        async modify(){
            let flag = confirm('수정하시겠습니까?');
            if(flag){
                this.editorText = this.getContent();
                try {
                    await this.$store.dispatch('modify_idea', {
                        ideaIdx : this.ideaIdx,
                        subject : this.subject,
                        content : this.editorText
                    })
                    this.changeFlag = this.contentFlag;
                    this.changeFlag = this.$store.getters.modify_get_flage;
                    this.$emit('child', this.changeFlag);
                }catch(err){
                    console.log(err);
                }
            }
        },
        getContent() {
            // content를 저장하는 액션처리
            return this.$refs.toastEditor.invoke('getMarkdown')
        },
        goIdeaPage(){
            let result = confirm("취소하시겠습니까 ?");
            if(result){
                // location.href='#/idea'
                history.back();
            }
        },
    },
}
</script>