<template>
    <v-app-bar app="app" color="grey" id="wrapper" >
        <v-row justify='center'>
            <v-col cols='2' v-on:click="goHome">
                <h1 id="title"  >
                    MFI
                </h1>
                <p id="subtitle">
                    Metapor For Investing
                </p>
            </v-col>
            <v-col cols='1' class="navItem">
                <router-link to="../home">
                    <v-btn text="text" rounded="rounded">
                        home
                    </v-btn>
                </router-link>
            </v-col>
            <v-col cols='1' class="navItem">
                <router-link to="../idea">
                    <v-btn text="text" rounded="rounded">
                        idea
                    </v-btn>
                </router-link>
            </v-col>
            <v-col cols='1' class="navItem">
                <router-link to="../about">
                    <v-btn text="text" rounded="rounded">
                        about
                    </v-btn>
                </router-link>          
            </v-col>
            <!-- 5 cols -->
            <v-spacer />
            <v-col cols='1'   v-if="isLogin()">
                <span id="loginWelcome"><h3  style="display: inline;">{{nickName}}</h3>님 환영합니다!</span>&nbsp;&nbsp;&nbsp;
            </v-col>
            <v-col cols='1'   v-if="isLogin()">
                <router-link to="../info">
                    <v-btn id="infoBtn" elevation="2" outlined="outlined" rounded="rounded" >내 정보</v-btn>
                </router-link>
            </v-col>
            <v-col cols='1'   v-if="isLogin()">
                <v-btn id="logoutBtn" elevation="2" outlined="outlined" rounded="rounded" v-on:click="logout"  >로그아웃</v-btn>
            </v-col>
            <v-col cols='1'  v-if="isLogin()">
                <router-link to="../admin">
                    <v-btn id="admin" v-if="admin()" elevation="2" outlined="outlined" rounded="rounded">관리자</v-btn>
                </router-link>
            </v-col>
            
            <v-col cols='4' v-else>
                <router-link to="../auth/signin"   >
                    <v-btn elevation="2" outlined="outlined" rounded="rounded" color="yellow">로그인</v-btn>
                </router-link>
                <router-link to="../auth/signup"  >
                    <v-btn elevation="2" outlined="outlined" rounded="rounded" color="yellow" >회원가입</v-btn>
                </router-link>
            </v-col>    
        </v-row>

    </v-app-bar>

</template>

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
                    this.nickName = this.userData.nickName
                    return true;
                }else if(this.accessToken === null) {
                    return false;
                }
            },
            admin(){
                if(this.userData.role === 'admin'){
                    return true;
                }else {
                    return false;
                }
                
            }
            
        }
    }
</script>
<style scoped>
    #wrapper{
    }
    #title {
        display: inline; padding-left: 50px;
    }
    #subtitle{
        display: inline;
    }
    .navItem{
        
    }
    #subWrapper{
        
    }
    #loginWelcome{
        
    }
    
</style>