<template>
    <v-card>
        <br>
        <v-row justify='center' class="pc" >
            <v-col cols="8" class="nickname">
                {{nickName}}
            </v-col>
        </v-row>
        <v-row justify='center' class="mobile" >
            
        </v-row>
        <br>
    </v-card>
    
</template>
<script>

export default {
    name: 'ConnectionUser',
    props: [
        "nickName",
        "role",
        "userIdx",
    ],
    components: {
    },
    created() {
    },
    data() {
        return {
            
        }
    },
    methods : {
    }
}

</script>
<style lang="scss" scoped>
@media all and (max-width:767px) {
    .pc{
        display: none;
    }
}
@media all and (max-width:1023px) and (min-width:767px) {
    .mobile{
        display: none;
    }
}
@media all and (min-width:1024px) {
    .mobile{
        display: none;
    }
}
.square{
    position: relative;
}
.role{
    position: absolute;
  width: 100%;
  height: 100%;
}
.nickname{
    text-align: center;
}
</style>

