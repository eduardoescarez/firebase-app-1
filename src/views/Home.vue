<script setup>


import { useUserStore } from "../stores/user";
const userStore = useUserStore();


</script>

<template>
    <h2>Pagina principal - {{ userStore.userData }}</h2>
</template>