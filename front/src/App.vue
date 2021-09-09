<template>
  <v-app>
    <link href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css' rel='stylesheet' type='text/css'>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    //
  }),
};
</script>

<style>
* {
 font-family: 'Spoqa Han Sans Neo', 'sans-serif';
}
a {
  text-decoration: none;
}

</style>
