/* eslint-disable */
<template>
    <v-container>
        <!-- pc version -->
        <v-row class="pc">
            <v-col cols='5'>
                <v-text-field
                label="제목 입력"
                v-model="subject">
                </v-text-field>
            </v-col>
        </v-row>

        <!-- mobile version -->
        <v-row  class="mobile">
            <v-col cols='1' />
            <v-col cols='8'>
                <v-text-field
                label='  제목 입력'
                v-model="subject">
                </v-text-field>
            </v-col>
        </v-row>

        <Editor :initialValue="editorText" ref="toastEditor" initialEditType="wysiwyg"  height="600px" />


        <!-- pc version -->
        <v-row justify='center'  class="pc">
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
        <!-- mobile version -->
        <v-row justify='center'  class="mobile">
            <v-col cols='5'>
                <v-btn  block elvation="2" v-on:click="save">
                    아이디어 추가하기
                </v-btn>
            </v-col>
            <v-col cols='1' />
            <v-col cols='5'>
                <v-btn  block elvation="2" v-on:click="goIdeaPage">
                    아이디어 취소하기
                </v-btn>
            </v-col>
            <v-col cols='1' />
        </v-row>
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
}
@media all and (min-width:1024px) {
    .mobile{
        display: none;
    }
}
</style>
<script>
import 'codemirror/lib/codemirror.css'; 
import '@toast-ui/editor/dist/toastui-editor.css'; 
import { Editor } from '@toast-ui/vue-editor';
import { coreValidation } from '../../utils/validation';

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
            const preorder = coreValidation.checkIdea(this.subject, this.editorText);
            if(preorder.message){
                alert(preorder.message); return;
            }
            let res;
            try {
                res =await this.$store.dispatch('add_idea', {
                    subject : this.subject,
                    content : this.editorText
                })
            }catch(err){
                console.log(err)
            }
            if(res === 'success'){
                alert("아이디어를 무사히 제출했습니다!");
                history.back(); return;
            }else {
                alert(res); return;
            }
        },
        getContent() {
          return this.$refs.toastEditor.invoke('getMarkdown')
        },
        goIdeaPage(){
            let result = confirm("취소하시겠습니까 ?");
            if(result){
                history.back();
            }
            
        },
    },
}
</script>