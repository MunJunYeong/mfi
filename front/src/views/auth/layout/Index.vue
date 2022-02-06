<template>
  <v-container>
    <br>
    <v-row justify="center">
      <v-col cols='4'>
        <div style="text-align: center;" v-on:click="goHome"> <h2 style="display : inline">MFI</h2>&nbsp;&nbsp;&nbsp;Metaphor For Investing</div>
      </v-col>
    </v-row>
    <br>
    <router-view />
  </v-container>
</template>

<script>
export default {
  name: 'AuthLayout',
  components: {
  },
  data: () => ({
    //
  }),
  methods : {
      goHome(){
        location.href='/home'
      }
    }
};
</script>
