<template>
    <v-container class="contentWrapper">
        <v-row 
            v-bind:style="{
                float : (source.float ==='right') ? 'right' : 'left',
                width : '100px', height : 'auto', wordBreak: 'break-all',
                border : '1px solid black', marginBottom : '30px', 
                // whiteSpace : 'nowrap',
            }"
        >
            {{source.msg}}
        </v-row>
        <!-- <v-row v-if="source.float === 'right'" class="rightWrapper">
            {{source.msg}}
        </v-row> -->
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
    .leftWrapper{
        width: 100px; height: auto; border: 1px solid black;
        float: left;  background-color: red; word-break:break-all;
        margin-bottom: 10px;
    }
    .rightWrapper{
        width: 100px; height: auto; border: 1px solid black;
        float: right; background-color: blue; word-break:break-all;
        margin-bottom: 10px;
    }
</style>
