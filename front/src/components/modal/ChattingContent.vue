<template>
    <v-container class="contentWrapper">
        <v-row v-if="source.float === 'left'"
            v-bind:style="{
                height : 'auto', wordBreak: 'break-all',
                border : '1px solid black',
                paddingRight: '50px'
                // whiteSpace : 'nowrap',
            }"
        >
            <span>{{source.msg}}</span>
        </v-row>
        <v-row v-if="source.float === 'right'"
            align-end
            v-bind:style="{
                height : 'auto', wordBreak: 'break-all',
                border : '1px solid black',
                justifyContent : 'flex-end',
                paddingLeft: '50px'
                // whiteSpace : 'nowrap',
            }"
        >
            <span style="">{{source.msg}}</span>
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
