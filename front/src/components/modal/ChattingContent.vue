<template>
    <v-container >
        <v-row v-if="source.float === 'left'" class="left">
            {{source.msg}}
        </v-row>
        <v-row v-if="source.float === 'right'" class="right">
            {{source.msg}}
        </v-row>
    </v-container>

</template>
<script>
/* eslint-disable */
export default {
    created () {
    },
    // props : [
    //     'float',
    //     'msg'
    // ],
    props: {
        index : {
            type : Number
        },
        source : {
            type : Object,
            default(){
                return{}
            }
        }
    },
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
        float: left; width: 50;
    }
    .right{
        float: right;
    }
    
</style>
