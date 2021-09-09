<template>
    <v-app-bar app="app" color="grey" >
        <h1 style="margin-right : 15px; margin-left : 10%;" v-on:click="goHome">
            MFI
        </h1>
        <h4 style="margin-top : 15px; margin-right : 60px" v-on:click="goHome">
            Metapor For Investing
        </h4>
        <router-link to="/home">
            <v-btn text="text" rounded="rounded">
                home
            </v-btn>
        </router-link>

        <router-link to="/idea">
            <v-btn text="text" rounded="rounded">
                idea
            </v-btn>
        </router-link>

        <router-link to="/about">
            <v-btn text="text" rounded="rounded">
                about
            </v-btn>
        </router-link>

        <v-spacer />

        <div v-if="isLogin()" style="margin-right : 10%; ">
            <div style="width : auto; background-color : yellow; display : inline-block; float : left;">
                <h3 style="display: inline;">{{nickName}}</h3>님 환영합니다!&nbsp;&nbsp;&nbsp;
            </div>
            <div style="float : left;background-color : green; display : inline-block;">
                <router-link to="info">
                    <v-btn elevation="2" outlined="outlined" rounded="rounded" >내 정보</v-btn>
                </router-link>
            </div>
            <div style="float : left;background-color : blue; display : inline-block;">
                <v-btn elevation="2" outlined="outlined" rounded="rounded" v-on:click="logout"  >로그아웃</v-btn>
            </div>
        </div>

        <div v-else>
            <router-link to="auth/signin"  >
                <v-btn elevation="2" outlined="outlined" rounded="rounded" color="yellow">로그인</v-btn>
            </router-link>
            <router-link to="auth/signup">
                <v-btn elevation="2" outlined="outlined" rounded="rounded" color="yellow" >회원가입</v-btn>
            </router-link>
        </div>     
    </v-app-bar>

</template>
<style>
    @media (max-width: 1023px){

    }
    @media (max-width: 767px){
        
    }
</style>
<script>

    export default {
        name: 'HeaderNav',
        props: {
            
        },
        created(){
            this.initialize();
        },
        data(){
            return{
                accessToken : localStorage.getItem('accessToken'),
                userData : this.$store.getters.auth_get_data,
                nickName : ''
            }
        },
        computed: {

        },
        methods : {
            initialize(){
               if(this.accessToken != null){
                   return true;
               } else{
                   return false;
               }
            },
            goHome(){
                // this.$router.go('#/home')
                location.href='#/home'
             },
            logout(){
                localStorage.removeItem('accessToken');
                this.$router.go(); //새로고침
            },
            isLogin(){
                if(this.accessToken != null){
                    this.nickName = this.userData[0].nickName
                    return true;
                }else if(this.accessToken === null) {
                    return false;
                }
            }
            
        }
    }
</script>
