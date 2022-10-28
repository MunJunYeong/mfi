<template>
  <div>
    <p>Naver Login Access Pages</p>
  </div>
</template>

<script>
/* eslint-disable */
import {naverService} from '../../services/rest';
export default {
  mounted() {
    const naverData = naverService.getNaverData();
    // console.log(naverData.getAccessToken());
    },
};
</script>