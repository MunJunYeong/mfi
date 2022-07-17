<template>
  <v-container>
    <v-container class="pc">
      <v-row justify='center'>
        <v-col cols='7'>
              <h2>MFI에 대하여</h2>
        </v-col>
      </v-row>
      <v-row justify='center'>
        <v-col cols='7'>
              <div id="about">
                MFI는 조엘 그린블란트가 만들었던 Value Investors Club을 참고삼아 제 친구가 만들어준 사이트입니다. <br>
                때는 2020년 겨울, 군대에 있을 때였습니다. 혹한기를 갔다오고 맑아진 머리상태로 ‘헤지펀드 시장의 마법사들’편에 조엘 그린블란트 인터뷰를 보고 있었습니다. 
                그러다가 우연히 VIC를 알게 되었고, ‘이거 흥미로운데?’하는 생각이 들었습니다. <br>
                VIC는 2주에 한 번씩 올라온 글들 중에서 Contest Winner를 뽑아 작성자에게 회원권을 주고, 올라오는 글들을 바로바로 볼 수 있게 해주는 식의 커뮤니티였습니다.(회원권이 없으면 45일이 지난 글들만 읽을 수 있었습니다.) <br> 
                그곳에 올라오는 글들의 퀄리티와 수익률이 매우 높았기에, 회원권의 가치는 굉장했고 수많은 뛰어난 투자자들이 회원권을 얻기 위해 그곳에 글을 올리는 선순환이 일어났습니다.(마이클 버리도 초창기에 VIC에 글을 많이 올렸었고, 다른 전문 펀드매니저들도 VIC에 글을 많이 올리고 있습니다.) 
                <br> 그 결과 만들어진지 20년이 지난 지금도 성공적으로 운영이 되고 있습니다. <br>
                이러한 비즈니스 모델이 너무 참신했었습니다. 그래서 VIC의 글들이 궁금해 바로 사이버 지식 정보장(싸지방)에 가서 VIC를 검색해보았고, 거기에 올라온 글들에 매료되었습니다. <br>
                싸지방에서 10년치 Contest Winner를 모조리 프린트해서 공부했었고, ‘아 이게 프로들의 분석이구나’ 느끼고 정말 많은 것을 배웠습니다. 
                <br> 제 주식인생에서 가장 가치있었던 시간 중에 하나라고 생각합니다.
                <br> 솔직히 말해서, 아무래도 시중에 팔리는 책들이나 개인블로그들, 유튜브에서는 ‘훌륭하다’고 생각되는 분석을 보기가 힘듭니다.  <br>
                아무래도 정말 가치있는 정보라면 그런 곳에 없겠지요. <br> 하지만 VIC의 비즈니스 모델 하에서는 우리나라에서도 ‘훌륭한’ 기업분석글들을 같이 공유하고 배워갈 수 있을거라는 생각이 들었습니다. 
              </div>
        </v-col>
      </v-row>
      <v-row justify='center'>
        <v-col cols='7'>
              <h2>MFI 주의사항</h2>
        </v-col>
      </v-row>
      <v-row justify='center'>
        <v-col cols='7'>
              <div id="about">
                MFI에 올라온 모든 글에 대한 저작권은 MFI가 가지고 있으며, 개인적 용도 이외의 사용(ex : 상업적 용도를 가진 판매, 스크랩 후 다른 사이트에 올리는 등의 행위)은 금지됩니다. 
                또한 MFI에 올라온 글들의 정보의 진위여부 및 투자권유에 따른 손실에 대해서는 책임지지 않습니다. 
                MFI는 올라온 글들에 대해서 책임지지 않습니다.
              </div>
        </v-col>
      </v-row>
    </v-container>
    <v-row v-if="joinRooms.length > 0"  id="chatting" class="pc">
        <Chatting v-for="(item,index) in this.joinRooms" :key ="index" 
            :data="item.data"
            :roomName = "item.roomName"
            :chatHistory = "item.chatHistory"
        />
    </v-row>

    <v-container class="mobile">
      <v-row justify='center'>
        <v-col cols='12'>
              <h2>MFI에 대하여</h2>
        </v-col>
      </v-row>
      <v-row justify='center'>
        <v-col cols='12'>
              <div id="about">
                MFI는 조엘 그린블란트가 만들었던 Value Investors Club을 참고삼아 제 친구가 만들어준 사이트입니다. <br>
                때는 2020년 겨울, 군대에 있을 때였습니다. 혹한기를 갔다오고 맑아진 머리상태로 ‘헤지펀드 시장의 마법사들’편에 조엘 그린블란트 인터뷰를 보고 있었습니다. 
                그러다가 우연히 VIC를 알게 되었고, ‘이거 흥미로운데?’하는 생각이 들었습니다. <br>
                VIC는 2주에 한 번씩 올라온 글들 중에서 Contest Winner를 뽑아 작성자에게 회원권을 주고, 올라오는 글들을 바로바로 볼 수 있게 해주는 식의 커뮤니티였습니다.(회원권이 없으면 45일이 지난 글들만 읽을 수 있었습니다.) <br> 
                그곳에 올라오는 글들의 퀄리티와 수익률이 매우 높았기에, 회원권의 가치는 굉장했고 수많은 뛰어난 투자자들이 회원권을 얻기 위해 그곳에 글을 올리는 선순환이 일어났습니다.(마이클 버리도 초창기에 VIC에 글을 많이 올렸었고, 다른 전문 펀드매니저들도 VIC에 글을 많이 올리고 있습니다.) 
                <br> 그 결과 만들어진지 20년이 지난 지금도 성공적으로 운영이 되고 있습니다. <br>
                이러한 비즈니스 모델이 너무 참신했었습니다. 그래서 VIC의 글들이 궁금해 바로 사이버 지식 정보장(싸지방)에 가서 VIC를 검색해보았고, 거기에 올라온 글들에 매료되었습니다. <br>
                싸지방에서 10년치 Contest Winner를 모조리 프린트해서 공부했었고, ‘아 이게 프로들의 분석이구나’ 느끼고 정말 많은 것을 배웠습니다. 
                <br> 제 주식인생에서 가장 가치있었던 시간 중에 하나라고 생각합니다.
                <br> 솔직히 말해서, 아무래도 시중에 팔리는 책들이나 개인블로그들, 유튜브에서는 ‘훌륭하다’고 생각되는 분석을 보기가 힘듭니다.  <br>
                아무래도 정말 가치있는 정보라면 그런 곳에 없겠지요. <br> 하지만 VIC의 비즈니스 모델 하에서는 우리나라에서도 ‘훌륭한’ 기업분석글들을 같이 공유하고 배워갈 수 있을거라는 생각이 들었습니다. 
              </div>
        </v-col>
      </v-row>
      <v-row justify='center'>
        <v-col cols='12'>
              <h2>MFI 주의사항</h2>
        </v-col>
      </v-row>
      <v-row justify='center'>
        <v-col cols='12'>
              <div id="about">
                MFI에 올라온 모든 글에 대한 저작권은 MFI가 가지고 있으며, 개인적 용도 이외의 사용(ex : 상업적 용도를 가진 판매, 스크랩 후 다른 사이트에 올리는 등의 행위)은 금지됩니다. 
                또한 MFI에 올라온 글들의 정보의 진위여부 및 투자권유에 따른 손실에 대해서는 책임지지 않습니다. 
                MFI는 올라온 글들에 대해서 책임지지 않습니다.
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
#chatting{
    position:fixed; bottom:50px; left: 100px;
}
</style>
<script>
import Chatting from '../../components/modal/Chatting.vue';
  export default {
    name: 'About',
    components : {
      Chatting
    },
    computed : {
      joinRooms : function(){
          return this.$store.getters.get_join_room;
      }
    },
    data() {
      return {
        
      }
    },
  }
</script>
