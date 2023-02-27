<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user';

const userStore = useUserStore();

</script>

<template>
    <h1>App</h1>

    <a-button type="primary" size="large">Boton</a-button>

    <nav v-if="!userStore.loadingSession"> 
        <RouterLink to ="/" v-if="userStore.userData">Home</RouterLink> | 
        <RouterLink to ="/register" v-if="!userStore.userData">Registro</RouterLink> | 
        <RouterLink to ="/login" v-if="!userStore.userData">Login</RouterLink> |
        <button @click="userStore.logoutUser" v-if="userStore.userData">Logout</button>
    </nav>
    <div v-else>
        Cargando usuario...
    </div>
  <RouterView />
</template>

