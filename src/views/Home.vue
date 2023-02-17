<script setup>


import { useUserStore } from "@/stores/user";
const userStore = useUserStore();


</script>

<template>
    <div>
        <h2>Pagina principal - {{ userStore.userData }}</h2>
    </div>
</template>