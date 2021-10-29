<template>
    <v-container>
      <HeaderNav />
      <router-view></router-view>
      <Footer />
    </v-container>

</template>

<script>
    import HeaderNav from '@/components/HeaderNav.vue'
    import Footer from '@/components/Footer.vue'

    export default {
        name: 'coreLayout',
        components: {
            HeaderNav,
            Footer
        },
    };
</script>