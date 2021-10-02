<template>
    
    <v-container>
        <!-- main -->
        <v-row justify="center">
            <v-col cols="12">

                <!-- 회원가입할지, 아이디어제출할지 -->
                <v-row justify="center">
                    <v-col cols="4">
                        <v-col class="chooseWrapper" cols = "12">
                            <v-row justify="center">
                                <v-col  class="icon" cols= "4">
                                    
                                </v-col >
                                <v-col  class="chooseComment" cols= "8">
                                    <div id="comment">
                                        <p>당신은 가치있는 투자자인가요 ?</p>
                                    </div>
                                    <router-link to="auth/signup">
                                        <v-btn
                                        elevation="2"
                                        >회원가입하기
                                        </v-btn>
                                    </router-link>
                                </v-col >
                            </v-row>
                        </v-col> 
                    </v-col>
                    <v-col cols="4">
                        <v-col class="chooseWrapper" cols = "12">
                            <v-row justify="center">
                                <v-col  class="icon" cols= "4">
                                    
                                </v-col >
                                <v-col  class="chooseComment" cols= "8">
                                    <div id="comment">
                                        <p>편협한 시야에서 벗어나세요!</p>
                                    </div>
                                    <router-link to="/add-idea">
                                        <v-btn
                                        elevation="2"
                                        >아이디어 내기
                                        </v-btn>
                                    </router-link>
                                </v-col >
                            </v-row>
                        </v-col> 
                    </v-col>
                </v-row>

                <!-- slogan -->
                <v-row justify="center">
                    <v-col cols="3">
                        <div class="topic">
                            <h1>성공 스토리</h1> <br>
                            <p>가치있는 투자자와 함께 합니다.</p>
                        </div>
                    </v-col>
                </v-row>

                <!-- 총방문자, 게시물, 아이디어확인 -->
                <v-row justify="center">
                    <v-col cols="1">
                    </v-col>
                    <v-col cols="2" style="height : 250px;">
                        <div id="home"></div>
                        <div class="middle" >1230</div>
                        <div class="last">총 방문자</div>
                    </v-col>
                    <v-col cols="1">
                    </v-col>

                    <v-col cols="2" style="height : 250px;">
                        <div id="idea"></div>
                        <div class="middle" >24</div>
                        <div class="last">총 게시물</div>
                    </v-col>
                    <v-col cols="1">
                    </v-col>

                    <v-col cols="2" style="height : 250px;">
                        <div id="idea"></div>
                        <div class="middle" >24</div>
                        <div class="last">총 게시물</div>
                    </v-col>
                    <v-col cols="1">
                    </v-col>

                    

                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    name: 'Home',

    components: {
      
      },
  }
</script>
<style>
    @import '../../style/home.css';
</style>