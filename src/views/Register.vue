<script setup>

import { ref } from "vue";
import { useUserStore } from '../stores/user';

const userStore = useUserStore();

const email = ref("");
const password = ref("");

const handleSubmit = () => {
    if(!email.value || password.value.length < 6)
    {
        return alert("llena los campos");
    }
    userStore.registerUser(email.value, password.value);
}

</script>


<template>
    <div>
        <h2>Pagina de registro</h2>
        <form @submit.prevent="handleSubmit">  
            <input type="email" placeholder="Ingrese email" v-model.trim="email">
            <input type="password" placeholder="Ingrese contraseña" v-model.trim="password">
            <button type="submit">Crear usuario</button>
        </form>
        
    </div>
</template>