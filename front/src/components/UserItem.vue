<template>
    <v-container>
        <v-row justify='center'>
            <v-col cols='1' />
            <v-col cols='1' style="text-align:center;">
                {{userIdx}}
            </v-col>
            <v-col cols='2' style="text-align:center;" >
                {{nickName}}
            </v-col>
            <v-col cols='2' v-bind:style="{ textAlign:'center', color : (role === 'winner')? 'red': 'black', fontWeight : 'bold', }">
                {{role}}
            </v-col>
            <v-col cols='3' style="text-align:center;">
                <v-btn v-on:click="checkIdea">
                    게시물 확인
                </v-btn>
            </v-col>
            <v-col cols='2'  style="text-align:center;">
                <v-btn v-if="checkRole()" v-on:click="changeRole">
                    위너승급↑
                </v-btn>
                <v-btn v-else v-on:click="changeRole">
                    정회원↓
                </v-btn>
            </v-col>
            <v-col cols='1' />
        </v-row>
    </v-container>
</template>
<script>
export default {
    name : 'userItem',
    props : [
        'userIdx',
        'nickName',
        'role'
    ],
    created (){
    },
    data() {
        return {
            // userRole : this.role,
        }
    },
    methods: {
        checkRole(){
            if(this.role === 'admin'){
                return;
            }else if(this.role === 'normal') {
                return true;
            }else{
                return false;
            }
        },
        async changeRole(){
            let role = "winner";
            if(this.role === "winner"){
                role = "normal";
            }
            try {
                await this.$store.dispatch('update_user_role', {
                    userIdx : this.userIdx,
                    role : role
                })
            }catch(err){
                console.log(err);
            }
            this.checkRole();
            return;
        },
        checkIdea(){
            this.$router.push({path: `user/${this.userIdx}/idea`});
        }
    },

}
</script>