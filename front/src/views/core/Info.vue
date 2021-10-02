<template>
    <v-container>
        <v-row>
            <v-col cols='2'>
                <br>
                <v-list>
                    <v-list-item-group v-model="model">
                        <v-list-item v-for="(item, i) in items" :key="i">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
            <v-col cols='10'  v-if="clickInfo()">
                <MyInfo />
            </v-col>
            <v-col cols='10' v-else >
                <MyIdea />
            </v-col>
        </v-row>





    </v-container>    
</template>
<script>
import MyInfo from '../../components/MyInfo.vue'
import MyIdea from '../../components/MyIdea.vue'

export default {
    name : 'info',
    created() {
        
    },
    components: {
        MyInfo,
        MyIdea
    },
    mounted() {
        
    },
    data() {
        return {
            items : [
                {
                    icon: 'mdi-inbox',
                    text: '내 정보',
                },
                {
                    icon: 'mdi-star',
                    text: '내 아이디어',
                },
            ],
            model: 0,
        }
    },
    methods: {
        clickInfo(){
            if(this.model === 0){
                return true;
            }else{
                return false;
            }
        },
    },
}
</script>