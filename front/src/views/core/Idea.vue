<template>
    <v-container ref="boardContainer" >
        <br>
        <v-row justify='center'>
            <v-col cols='3'  >
                <div style=" height: 75px; " >
                    <p style="font-size: 1.5em;">모든아이디어</p> 
                    <p style="font-size: 0.8em;">12,411개 게시물</p></div>
            </v-col>
            <!-- 여백 -->
            <v-spacer></v-spacer>
            <v-col cols='1'  >
                 <router-link to="/add-idea">
                    <v-btn block outlined  style="height : 60px">
                        아이디어 내기
                    </v-btn>
                </router-link>
            </v-col>
            <v-col cols='1'  >
                <div id="icon" style="height: 60px;"></div>
            </v-col>
            <v-col cols='1'  >
                <div style="">
                    <v-combobox
                    v-model="modelIdea"
                    :items="selectIdea" outlined
                    >
                    </v-combobox>
                </div>
            </v-col>

            <v-col cols='1'  >
                <div style="">
                    <v-combobox
                    v-model="modelDate"
                    :items="selectDate" outlined
                    >
                    </v-combobox>
                </div>
            </v-col>
        </v-row>

        <v-row justify='center'>
            <v-col>
                <!-- 공백 -->
            </v-col>
        </v-row>
        
        <v-row justify='center'>
            <v-col cols='12'>
                <IdeaItem v-for="(item, index) in this.IdeaItem"  :key="index" 
                :nickName="item.user.nickName" 
                :ideaIdx="item.ideaIdx" 
                :subject="item.subject" 
                :content="item.content"
                /> 
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import IdeaItem from '../../components/IdeaItem.vue'
    
    export default {
        name: 'Idea',
        created() {
            this.showIdea();
        },
        components: {
            IdeaItem
        },
        props: {

        },
        data() {
            return {
                modelIdea: ['모든 아이디어'],
                selectIdea: [
                  '모든 아이디어',
                  '위너 아이디어'
                ],
                modelDate : ['최신 순'],
                selectDate: [
                  '최신 순',
                  '오래된 순'
                ],

                IdeaItem :  this.$store.getters.idea_get_data,
                token: localStorage.getItem('accessToken'),
                nickName:''
            }
        },
        methods: {
            async showIdea(){
                try {
                    await this.$store.dispatch('idea_show',{
                    })
                    
                }catch (err){
                    console.log(err)
                }
            },
        },
        
    }
</script>
<style >
    #icon{
        background-image: url('../../assets/logo.png');background-size: 100% 100%;
    }
    #ideaItem:hover {
        background-color: aquamarine;
    }
</style>