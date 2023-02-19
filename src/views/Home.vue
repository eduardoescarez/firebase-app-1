<script setup>
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";

const userStore = useUserStore();
const databaseStore = useDatabaseStore();

databaseStore.getUrls();
</script>

<template>
    <div>
        <h2>Pagina principal</h2>
        <p>{{ userStore.userData?.email }}</p>
    </div>
</template>