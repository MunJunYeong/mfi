<template>
    <v-container  class="wrapper">
        
    </v-container>

</template>
<script>
/* eslint-disable */
export default {
    created () {
    },
    props : [
        'data'
    ],
    computed : {
        userData : function(){
            return  this.$store.getters.auth_get_data;
        },
       
    },
    data() {
        return {
        }
    }, 
    methods : {
        
    }
}
</script>


<style scoped>
    .wrapper {

    }
</style>
