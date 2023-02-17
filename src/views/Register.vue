<script setup>
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

</script>


<template>
    <div>
        <h2>Pagina de registro</h2>
        <p>{{ userStore.userData }}</p>
        <button @click="userStore.registerUser('Ignacio')">Ingresar</button>
    </div>
</template>