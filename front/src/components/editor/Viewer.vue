<template>
    <Viewer v-if="content != null" : initialValue="content" />
</template>
<script>
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css"; 
import { Viewer } from "@toast-ui/vue-editor";

export default {
    components : {
        Viewer
    },
    data() {
        return {
            content : null
        }
    },
    mounted() {
        // fecth("주소").then(res => {
        //     if(res.ok){
        //         return res.json();
        //     }else {
        //         throw res;
        //     }
        // }).then(data => {
        //     this.content = data;
        // })
    },
}
</script>