<script setup>

import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const email = ref("eduardoe@example.com");
const password = ref("123123123");

const handleSubmit = async() => {
    if(!email.value || password.value.length < 6)
    {
        return alert("llena los campos");
    }
    await userStore.loginUser(email.value, password.value);
    router.push("/");
}

</script>


<template>
    <div>
        <h2>Pagina de acceso</h2>
        <form @submit.prevent="handleSubmit">  
            <input type="email" v-model.trim="email">
            <input type="password" v-model.trim="password">
            <button type="submit" :disabled="userStore.loadingUser">Acceder</button>
        </form>
        
    </div>
</template>