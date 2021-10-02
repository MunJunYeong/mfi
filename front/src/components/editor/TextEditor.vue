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
    </v-container>
    
</template>
<script>
import 'codemirror/lib/codemirror.css'; 
import '@toast-ui/editor/dist/toastui-editor.css'; 
import { Editor } from '@toast-ui/vue-editor';


export default {
    nama : 'TextEditor',
    data() {
        return {
            editorText : '',
            subject : '',
        }
    },
    components : {
        Editor
    },
    methods: {
        async save(){
            this.editorText = this.getContent();
            console.log(this.editorText)
            try {
                await this.$store.dispatch('add_Idea', {
                    subject : this.subject,
                    content : this.editorText
                })

            }catch(err){
                console.log(err)
            }
        },
        getContent() {
          return this.$refs.toastEditor.invoke('getMarkdown')
        },
        goIdeaPage(){
            let result = confirm("취소하시겠습니까 ?");
            if(result){
                location.href='#/idea'
            }
            
        },
    },
}
</script>