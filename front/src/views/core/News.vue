<template>
    <v-container>
        <v-container class="pc">
            <v-row justify='center'>
                
            </v-row>
        </v-container>
        <v-container class="mobile">
            dfasfsafasfsa
        </v-container>
    </v-container>
</template>
<script>
export default {
    
}
</script>
<style scoped>
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
</style>