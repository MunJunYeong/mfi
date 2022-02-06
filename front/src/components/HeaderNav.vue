<template>
    <v-card class="mx-auto overflow-hidden">
        <v-app-bar app="app" color="#CFD8DC" >
            <!-- mobile title and icon -->
            <v-toolbar-title class="mobile_icon">
                <v-col cols='3'>
                    <router-link to="/home">
                        <h3>MFI</h3> 
                    </router-link>
                    <!-- <v-img  src="@/assets/mfi_logo.png" width="330" height="70">
                    </v-img> -->
                </v-col>
            </v-toolbar-title>

            <!-- pc version -->
            <v-row justify='center' id="pc_row">
                <v-col cols='3'>
                    <router-link to="/home">
                        <v-img  src="@/assets/mfi_logo.png" width="330" height="70" />
                    </router-link>
                </v-col>
                <v-col cols='1' class="pc_nav">
                    <router-link to="/about">
                        <v-btn text="text" rounded="rounded" color="#455A64" style="margin-top:15px;">
                            MFI 소개
                        </v-btn>
                    </router-link>
                </v-col>
                <v-col cols='1' class="pc_nav">
                    <router-link to="/idea">
                        <v-btn text="text" rounded="rounded" color="#455A64" style="margin-top:15px;">
                            분석글
                        </v-btn>
                    </router-link>
                </v-col>
                <v-col cols='1' class="pc_nav">
                    <router-link to="/notice">
                        <v-btn text="text" rounded="rounded" color="#455A64" style="margin-top:15px;">
                            공지
                        </v-btn>
                    </router-link>          
                </v-col>
                <!-- 5 cols -->
                <v-spacer />
                
                <v-col cols='2' id="loginWelcomeWrapper"   v-if="isLogin()">
                    <span id="loginWelcome" >{{nickName}} <p id="showRole">[{{role}}]</p></span>&nbsp;&nbsp;&nbsp;
                </v-col>
                <v-col cols='1'   v-if="isLogin()">
                    <router-link to="/info">
                        <v-btn id="infoBtn" elevation="2" outlined="outlined" rounded="rounded" >내 정보</v-btn>
                    </router-link>
                </v-col>
                <v-col cols='1'   v-if="isLogin()">
                    <v-btn id="logoutBtn" elevation="2" outlined="outlined" rounded="rounded" v-on:click="logout" >로그아웃</v-btn>
                </v-col>
                <v-col cols='1'  v-if="isLogin()">
                    <router-link to="/admin">
                        <v-btn id="admin" v-if="admin()" elevation="2" outlined="outlined" rounded="rounded">관리자</v-btn>
                    </router-link>
                </v-col>
                
                <v-col cols='3' v-else>
                    <router-link to="/auth/signin"   >
                        <v-btn elevation="2" class="btn_loginEnter" outlined="outlined" rounded="rounded">로그인</v-btn>
                    </router-link>
                    <router-link to="/auth/signup"  >
                        <v-btn elevation="2" class="btn_loginEnter" outlined="outlined" rounded="rounded">회원가입</v-btn>
                    </router-link>
                </v-col>    
            </v-row>
        
            <!-- mobile version row -->
            <v-row justify=  'center' id="mobile_row">
                <!-- <v-spacer />
                <v-col cols='2' v-if="isLogin()">
                    {{nickName}}
                </v-col>
                <v-col cols='2' v-if="isLogin()">
                    {{role}}
                </v-col>
                <v-col cols='4' v-if="isLogin()">
                    <p v-on:click="logout">로그아웃</p>
                </v-col>
                <v-col cols='4' v-else style="padding-bottom: 30px;">
                    <router-link to="/auth/signin"  >
                        로그인
                    </router-link>
                </v-col>
                <v-spacer /> -->
            </v-row>
            <v-app-bar-nav-icon @click="drawer = true" class="mobile_icon"></v-app-bar-nav-icon>
        </v-app-bar>


        <v-navigation-drawer v-model="drawer" absolute temporary  class="mobile_nav">
            <v-list nav dense>
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            홈
                        </v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            아이디어
                        </v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </v-card>


</template>



<style scoped>

@media all and (max-width:767px) {
    #pc_row{
        display: none; 
    }
}
@media all and (max-width:1023px) {
    #pc_row{
        display: none;
    }
}
@media all and (min-width:1024px) {
    #mobile_row, #mobile_nav, .mobile_icon {
        display: none;
    }
}

    .menus{
        font-family: 'ROKABold';
    }
    #title {
        display: inline; 
        padding-left: 50px;
         font-family: 'Recipekorea';
         font-size:35px;
         cursor:pointer;
    }
    #subtitle{
        padding-left:5px;
        display: inline;
        font-family: 'S-CoreDream-3Light';
    }
   
    .btn_menu{
        display: table-cell;
        vertical-align: middle;
    }
    .btn_loginEnter, #infoBtn, #logoutBtn, #admin{
        margin-top:10px;
         color:#546E7A;
    }
    .btn_loginEnter:hover{
        background-color: #F0F4C3;
        color:#3E2723;
    }
    #infoBtn, #logoutBtn, #admin{
        margin-top:15px;
    }
    #loginWelcomeWrapper{
         /* padding-top: 1.5%; */
        line-height: 64px;   text-align: center;

    }
    #loginWelcome{
        vertical-align: middle;
        font-family: 'Chosunilbo_myungjo';
        font-weight: 400;
        font-weight: normal;
    }
    #showRole{
        font-size: 0.6em; display: inline; color: darkgreen;
    }
    @font-face {
    font-family: 'ROKABold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.1/ROKABold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Recipekorea';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/Recipekorea.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
     font-family: 'S-CoreDream-3Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
     font-weight: normal;
     font-style: normal;
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
                nickName : '',
                role : '',
                drawer: false,
                group: null,
            }
        },
        computed: {
            userData : function(){
                return this.$store.getters.auth_get_data;
            }
        },
        methods : {
            initialize(){
               if(this.accessToken != null){
                   return true;
               } else{
                   return false;
               }
            },
            logout(){
                localStorage.removeItem('accessToken');
                location.href='/home'
                this.$router.go('/home'); //새로고침
            },

            isLogin(){
                if(this.accessToken != null){
                    this.nickName = this.userData.nickName;
                    this.role = this.userData.role;
                    return true;
                }else {
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