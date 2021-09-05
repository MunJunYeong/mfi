
<template>
    <v-row justify='center' id="ideaItem" v-on:click = "clickIdea(ideaIdx)">
        <v-col cols='2'>
            <div class="wrapper">
                <div id="ideaIdx">
                    {{ideaIdx}}번째 아이디어
                </div>
                <div id="nickName">
                    닉네임 : {{nickName}}
                </div>
            </div>
            
        </v-col>
        <v-col cols='10'>
            <!-- <div style="background-color : yellow; height: 120px;">{{ this.title }}</div> -->
            <div class="wrapper">
                <div id="subject">
                    제목 : {{subject}}
                </div>
                <div id="content" v-html="content">
                    
                </div>
            </div>
        </v-col>
        
    </v-row>
</template>
<script>
    export default {
        name: 'ideaList',
        props: [
            "ideaIdx",
            "nickName",
            "subject",
            "content",
        ],
        methods : {
            clickIdea(ideaIdx){
                this.$router.push({name: '/IdeaClick', params: {ideaIdx: ideaIdx}});
                location.href='#/idea-click';
            },
        },
    }
</script>

<style scoped>
    .wrapper{
        background-color : yellow; height: 120px;
    }
    #nickName{
        height: 60px; background-color: beige; text-align: center; line-height: 60px;
    }
    #ideaIdx{
        height: 60px; background-color: darkgray; text-align: center;line-height: 60px;
    }
    #subject{
        height: 40px; background-color: aqua; font-size: 1.2em;
    }
    
    #content{
        height: 80px; background-color: darkgoldenrod; 
        overflow: hidden;
    }
</style>