<template>
  <v-container>
    <br>
    <v-row justify="center">
      <v-col cols='4'>
        <router-link to="/home">
          <div style="text-align: center;"> <h2 style="display : inline">MFI</h2>&nbsp;&nbsp;&nbsp;Metaphor For Investing</div>
        </router-link>
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
      
    }
};
</script>
