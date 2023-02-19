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
        <ul>
            <li v-for="item in databaseStore.documents" :key="item.id">
                {{ item.id }} : {{ item.name }} - {{  item.short }}
            </li>
        </ul>
    </div>
</template>