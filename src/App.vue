<script setup>
import { RouterLink, RouterView } from "vue-router"
import { useUserStore } from "./stores/user";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const selectedKeys = ref(["login"]);

watch(() => route.name, () => {selectedKeys.value = [route.name]} );


</script>

<template>
    <a-layout>
        <a-layout-header>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
                <a-menu-item v-if="userStore.userData" key="home">
                    <RouterLink to ="/" >Home</RouterLink>
                </a-menu-item>
                <a-menu-item v-if="userStore.userData" key="profile">
                    <RouterLink to ="/profile">Perfil</RouterLink>
                </a-menu-item>
                <a-menu-item v-if="!userStore.userData" key="login">
                    <RouterLink to ="/login">Login</RouterLink>
                </a-menu-item>
                <a-menu-item v-if="!userStore.userData" key="register">
                    <RouterLink to ="/register">Registro</RouterLink>
                </a-menu-item>
                <a-menu-item @click="userStore.logoutUser" v-if="userStore.userData" key="logout">
                    Logout
                </a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content style="padding: 0 50px">
            <div class="container">
                <div v-if="userStore.loadingSession">Cargando usuario...</div>
                <router-view></router-view>
            </div>
        </a-layout-content>
    </a-layout>
</template>

<style>

.container{
    background-color: #fff;
    padding: 24px;
    min-height: calc(100vh - 64px);
}

.text-center{
    text-align: center;
}
</style>