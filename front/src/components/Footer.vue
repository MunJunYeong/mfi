<template>
   <footer>
        <br>
      <p>copyRight moonjunyoungbabo@naver.com</p>
        <div id="wrapper">
            <a href="#"><img src="@/assets/blog.png" alt="블로그" class="iconclick"></a>
            <a href="#"><img src="@/assets/face.png" alt="페이스북" class="iconclick"></a>
            <a href="#"><img src="@/assets/ka.png" alt="카카오톡" class="iconclick"></a>
            <a href="#"><img src="@/assets/insta.png" alt="인스타그램" class="iconclick"></a>
            <a href="#"><img src="@/assets/tw.png" alt="트위터" class="iconclick"></a>
        </div>
   </footer>
</template>

<script>
export default {
   
}
</script>

<style scoped>
@font-face {
     font-family: 'S-CoreDream-3Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}
    footer{
        border-top:1px solid #35495e; 
        text-align:center; 
        font-size:16px; 
        margin:100px 0 0 0;
    }
    p{
        font-family: 'S-CoreDream-3Light';
    }
    .wrapper{
        text-align: center;
    }
    
    .iconclick{
        width:30px;
        height: 30px;
        margin-right:5px;
    }
</style>