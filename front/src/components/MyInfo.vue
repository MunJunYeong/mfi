<template>
    <v-container>
        <!-- pc version -->
        <br class="pc">
        <v-row class="pc">
            <v-col  cols='1' />
            <v-col cols='9' id="title"> 
                개인정보
                <hr>
            </v-col>
        </v-row>
        <br class="pc">
        <v-container class="pc">
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
        <!-- mobile version -->
        <!-- <br class="mobile"> -->
        <v-row class="mobile">
            <v-col cols='1'></v-col>
            <v-col cols='11' id="mobileTitle"> 
                개인정보
                <hr>
            </v-col>
        </v-row>
        <v-container class="mobile">
            <v-row>
                <v-col cols='5' class="mobileSubject">
                    닉네임
                </v-col>
                <v-col cols='7' class="mobileSubject"  >
                    {{nickName}}
                </v-col>
            </v-row>
            <br><br>
            <v-row>
                <v-col cols='5' class="mobileSubject">
                    이메일
                </v-col>
                <v-col cols='7' class="mobileSubject">
                    {{email}}
                </v-col>
            </v-row>
            <br><br>
            <v-row>
                <v-col cols='5' class="mobileSubject">
                    등급
                </v-col>
                <v-col cols='7' class="mobileSubject">
                    {{role}}
                </v-col>
            </v-row>
            <br><br>
            <v-row>
                <v-col cols='5' class="mobileSubject">
                    가입일
                </v-col>
                <v-col cols='7' class="mobileSubject">
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
@media all and (max-width:767px) {
    .pc{
        display: none;
    }
}
@media all and (max-width:1023px) and (min-width:767px) {
    .mobile{
        display: none;
    }
    /* 태블릿은 잘보임 */
}
@media all and (min-width:1024px) {
    .mobile{
        display: none;
    }
}

    #title{
        font-size: 2em; height: 80px;
    }
    #mobileTitle{
        font-size: 1.3em; height: 80px;
    }
    .mobileSubject{
        font-size: 0.8em;
    }
</style>