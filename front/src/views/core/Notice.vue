<template>
    <v-container>
        <v-container class="pc">
            <v-row justify='center' >
                <v-col cols='8'>
                    <p style="font-size:3em">MFI 규칙</p>
                </v-col>
            </v-row>
            <v-row justify='center'>
                <v-col cols='8'>
                    <div id="about">
                        <p style="font-size:1em;"> 누구나 자신의 아이디어를 정교화시켜서 글을 올릴 수 있으며, 2주에 한 번씩 가장 좋은 아이디어를('위너')을 뽑아서 ‘회원권’을 드립니다. </p >
                        <p style="font-size:1em;"> 위너 회원권을 유지하기 위해서는 1년에 두 개 이상의 아이디어를 꾸준히 제출하여야 합니다.  </p>
                        <p style="font-size:1em;">위너 회원이 되면 다른 분들이 적은 글을 delay이 없이 바로 열람이 가능하고, 회원권이 없으신 분들은 45일이 지난 후에야 열람이 가능합니다.</p> 
                    </div>
                </v-col>
            </v-row>
            <v-row justify='center'>
                <v-col cols='8'>
                    <p style="font-size:3em">MFI에 대한 문의사항</p>
                </v-col>
            </v-row>
            <v-row justify='center'>
                <v-col cols='8'>
                    <div id="about">
                        <p style="font-size:1em;"> 개발 관련 사이트 오류 및 에러 사항 문의 : msw711666@naver.com </p >
                        <p style="font-size:1em;"> 주식 분석 글 관련 문의 : whwogns9@naver.com </p >
                    </div>
                </v-col>
            </v-row>
        </v-container>

        <v-container class="mobile">
            <v-row justify='center'>
                <v-col cols='12'>
                    <p style="font-size:2em">MFI 규칙</p>
                </v-col>
            </v-row>
            <v-row justify='center'>
                <v-col cols='12'>
                    <div id="about">
                        <p style="font-size:1em;"> 누구나 자신의 아이디어를 정교화시켜서 글을 올릴 수 있으며, 2주에 한 번씩 가장 좋은 아이디어를('위너')을 뽑아서 ‘회원권’을 드립니다. </p >
                        <p style="font-size:1em;"> 위너 회원권을 유지하기 위해서는 1년에 두 개 이상의 아이디어를 꾸준히 제출하여야 합니다.  </p>
                        <p style="font-size:1em;">위너 회원이 되면 다른 분들이 적은 글을 delay이 없이 바로 열람이 가능하고, 회원권이 없으신 분들은 45일이 지난 후에야 열람이 가능합니다.</p> 
                    </div>
                </v-col>
            </v-row>
            <v-row justify='center'>
                <v-col cols='12'>
                    <p style="font-size:2em">MFI에 대한 문의사항</p>
                </v-col>
            </v-row>
            <v-row justify='center'>
                <v-col cols='12'>
                    <div id="about">
                        <p style="font-size:1em;"> 개발 관련 사이트 오류 및 에러 사항 문의 : msw711666@naver.com </p >
                        <p style="font-size:1em;"> 주식 분석 글 관련 문의 : whwogns9@naver.com </p >
                    </div>
                </v-col>
            </v-row>
        </v-container>

    </v-container>
</template>
<style scoped>
@media all and (max-width:767px) {
    .pc{
        display: none;
    }
}
@media all and (max-width:1023px) and (min-width:767px) {
    .pc{
        display: none;
    }
    /* 태블릿은 잘보임 */
}
@media all and (min-width:1024px) {
    .mobile{
        display: none;
    }
}
</style>
<script>
export default {
    name : 'notice',
    
}
</script>