<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <h1>App</h1>
    <nav> 
        <RouterLink to ="/">Home</RouterLink> | 
        <RouterLink to ="/register">Registro</RouterLink> | 
        <RouterLink to ="/login">login</RouterLink> |
        <button>Logout</button>
    </nav>
  <RouterView />
</template>

