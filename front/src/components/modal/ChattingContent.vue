<template>
    <v-container >
        <v-row v-if="source.float === 'left'"
            v-bind:style="{
                height : 'auto', wordBreak: 'break-all',
                paddingRight: '120px', paddingTop : '10px',
                fontSize : '14px',
            }"
        >
            <span>{{source.msg}}</span>
        </v-row>
        <v-row v-if="source.float === 'right'"
            align-end
            v-bind:style="{
                height : 'auto', wordBreak: 'break-all',
                justifyContent : 'flex-end',
                paddingLeft: '130px', paddingTop : '10px',
                marginBotton : '5px', 
                fontSize : '14px'
            }"
        >
        {{source.msg}}
        </v-row>
    </v-container>

</template>
<script>
/* eslint-disable */

export default {
    created () {
    },
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

</style>
