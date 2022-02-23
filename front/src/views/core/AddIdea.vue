<template>
    <v-card>
        <v-row justify='center' class="pc" >
            <v-col cols='12'>
                <v-row justify='center' >
                    <v-col cols='10'>
                        <div style="height: 120px; font-size : 2.2em;  padding-top : 35px">아이디어 추가하기</div>
                    </v-col>
                    <v-col cols='2' align="right">
                    </v-col>
                </v-row>
                <v-row justify='center' >
                    <TextEditor id="myEditor" />
                </v-row>
                
                <br><br><br><br>
            </v-col>
        </v-row>
        <v-row justify='center' class="mobile" >
            <v-col cols='12'>
                <v-row justify='center' >
                    <v-col cols='1' />
                    <v-col cols='10'>
                        <div style="height: 120px; font-size : 1.4em;  padding-top : 35px">아이디어 추가하기</div>
                    </v-col>
                    <v-col cols='1' align="right">

                    </v-col>
                </v-row>
                <v-row justify='center' >
                    <TextEditor id="myEditor" />
                </v-row>
                
                <br><br><br><br>
            </v-col>
        </v-row>
    </v-card>
    
</template>
<script>
    import TextEditor from '../../components/editor/TextEditor.vue'

    export default {
        name: 'AddIdea',
        props: [],
        components: {
            TextEditor
        },
        created() {
            this.checkUser();
        },
        data() {
            return {
                
            }
        },
        methods : {
            checkUser(){ // 화면이 만들어질 때 토큰이 존재하지 않는 상대를 돌려보냄.
                if(!this.$store.getters.auth_get_token){
                    // alert('잘못된 경로로 접근했습니다.');
                    history.back();
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
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
.editor {
  display: flex;
  flex-direction: column;
  max-height: 1200px;
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

