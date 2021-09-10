<template>
    <v-app-bar app="app" color="grey" id="wrapper" >
        <h1 id="title"  v-on:click="goHome">
            MFI
        </h1>
        <div class="subtitle" v-on:click="goHome">
            Metapor For Investing

        </div>
        
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

        <div v-if="isLogin()" id="subWrapper">
            <span id="loginWelcome"><h3  style="display: inline;">{{nickName}}</h3>님 환영합니다!</span>&nbsp;&nbsp;&nbsp;
            
            <router-link to="info">
                <v-btn id="infoBtn" elevation="2" outlined="outlined" rounded="rounded" >내 정보</v-btn>
            </router-link>
            <v-btn id="logoutBtn" elevation="2" outlined="outlined" rounded="rounded" v-on:click="logout"  >로그아웃</v-btn>
            <v-btn id="admin" v-if="admin()" elevation="2" outlined="outlined" rounded="rounded">관리자</v-btn>
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
    @import '../style/header.css';
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
            },
            admin(){
                if(this.userData[0].role === 'admin'){
                    return true;
                }else {
                    return false;
                }
                
            }
            
        }
    }
</script>
