<template>
    <v-row justify='center' >
        <v-col cols='12'>
            <v-row justify='center' >
                <v-col cols='10'>
                    <div style="height: 120px; font-size : 2.2em;  padding-top : 35px">아이디어 추가하기</div>
                </v-col>
                <v-col cols='2' align="right">

                </v-col>
            </v-row>
            

            <!-- <v-row justify='center' >
                <v-col cols='12'>
                    <div class="deitor" v-if="editor">
                        <menu-bar class="editor__header" :editor="editor" />
                        <br>
                        <editor-content class="editor_content" :editor="editor" v-model="content" />
                    </div>
                </v-col>
            </v-row> -->

            <v-row justify='center' >
                <TextEditor id="myEditor" />
            </v-row>
            

            <br><br><br><br>
            

        </v-col>
    </v-row>
</template>
<script>
    import TextEditor from '../../components/editor/TextEditor.vue'

    export default {
        name: 'AddIdea',
        props: [ ],
        components: {
            TextEditor
        },

        data() {
            return {
                
            }
        },

        created() {
            
        },

        methods : {
            
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
  #myEditor{
      background-color: darkcyan;
  }

  

  
}
</style>
