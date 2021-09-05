<template>
    <v-container>
      <HeaderNav />
      <router-view></router-view>
    </v-container>

</template>

<script>
    import HeaderNav from '@/components/HeaderNav.vue'

    export default {
        name: 'coreLayout',
        components: {
            HeaderNav
        },
    };
</script>