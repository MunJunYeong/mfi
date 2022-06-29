<template>
    <v-container >
        <v-row v-if="source.float === 'left'"
            v-bind:style="{
                height : 'auto', wordBreak: 'break-all',
                paddingRight: '110px', paddingTop : '10px',
                fontSize : '13px',
            }"
        >
            <span class="leftMsg">{{source.msg}}</span>
        </v-row>
        <v-row v-if="source.float === 'right'"
            align-end
            v-bind:style="{
                height : 'auto', wordBreak: 'break-all',
                justifyContent : 'flex-end',
                paddingLeft: '110px', paddingTop : '10px',
                marginBotton : '5px', 
                fontSize : '13px'
            }"
        >
            <span class="rightMsg">{{source.msg}}</span>
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
    .leftMsg {
        border-radius: 15px; background-color: white; padding: 9px 9px 9px 9px;
    }
    .rightMsg {
        border-radius: 15px; background-color: yellow; padding: 9px 9px 9px 9px;
    }
</style>
