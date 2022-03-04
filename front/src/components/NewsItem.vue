<template>
    <v-container>
        <v-container class="pc">
            <v-row justify='center'>
                <v-col cols='12' id="title">
                    <span id="title">{{title}}</span>  <br>
                    <span id="content">{{content}}</span> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="date">{{date}}</span>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="mobile">
            
        </v-container>
    </v-container>
</template>
<script>
export default {
    name: 'newsList',
    props: [
        "title",
        "content",
        "date"
    ],
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
    }
    @media all and (min-width:1024px) {
        .mobile{
            display: none;
        }
    }
    #title{
        font-size: 1.2em; font-weight: 600;
    }
    #content{
        font-size: 0.9em; font-weight: 400;
    }
    #date{
        font-size: 0.7em; font-weight: 350;
    }
</style>