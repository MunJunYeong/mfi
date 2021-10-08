<template>
    <v-container>
        <br>
        <v-row>
            <v-col  cols='1' />
            <v-col cols='9' id="title"> 
                개인정보
                <hr>
            </v-col>
            
        </v-row>
        
        <br>
        <v-container >
            <v-row>
                <v-col  cols='1' />
                <v-col cols='3'>
                    닉네임
                </v-col>
                <v-col cols='8'>
                    {{nickName}}
                </v-col>
            </v-row>
            <br><br>
            <v-row>
                <v-col  cols='1' />
                <v-col cols='3'>
                    이메일
                </v-col>
                <v-col cols='8'>
                    {{email}}
                </v-col>
            </v-row>
            <br><br>
            <v-row>
                <v-col  cols='1' />
                <v-col cols='3'>
                    등급
                </v-col>
                <v-col cols='8'>
                    {{role}}
                </v-col>
            </v-row>
            <br><br>
            <v-row>
                <v-col  cols='1' />
                <v-col cols='3'>
                    가입한 날자
                </v-col>
                <v-col cols='8'>
                    {{createdAt}}
                </v-col>
            </v-row>
        </v-container>

        
    </v-container>
</template>
<script>
import moment from 'moment';
moment.lang('ko', {
    weekdaysShort: ["일","월","화","수","목","금","토"],
});

export default {
    name : 'MyInfo',
    created() {
        this.initialize();
    },
    computed : {
        createdAt() {
            return moment(this.created).format("YY-MM-DD (ddd)  HH : mm");
        }
    },
    data() {
        return {
            userData : this.$store.getters.auth_get_data,
            nickName : '',
            email : '',
            role : '',
            created : '',
        }
    },
    methods: {
        initialize(){
          this.nickName = this.userData.nickName;
          this.email = this.userData.email;
          this.role = this.userData.role;
          this.created = this.userData.created;
        },
    },
}
</script>
<style scoped>
    #title{
        font-size: 2em; height: 80px;
    }
</style>