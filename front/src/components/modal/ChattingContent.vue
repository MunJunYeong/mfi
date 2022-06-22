<template>
    <v-container >
        <v-row v-if="this.float === 'left'" class="left">
            {{msg}}
        </v-row>
        <v-row v-if="this.float === 'right'" class="right">
            {{msg}}
        </v-row>
    </v-container>

</template>
<script>
/* eslint-disable */
export default {
    created () {
    },
    props : [
        'float',
        'msg'
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
    .left{
        float: left;
    }
    .right{
        float: right;
    }
</style>
