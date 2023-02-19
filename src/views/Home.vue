<script setup>
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
</script>

<template>
    <div>
        <h2>Pagina principal</h2>
        <p>{{ userStore.userData?.email }}</p>
    </div>
</template>