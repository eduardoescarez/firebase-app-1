<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user';

const userStore = useUserStore();

</script>

<template>
    <h1>App</h1>
    <nav> 
        <RouterLink to ="/">Home</RouterLink> | 
        <RouterLink to ="/register">Registro</RouterLink> | 
        <RouterLink to ="/login">Login</RouterLink> |
        <button @click="userStore.logoutUser">Logout</button>
    </nav>
  <RouterView />
</template>

