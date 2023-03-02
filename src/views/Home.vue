<script setup>
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();

databaseStore.getUrls();

</script>

<template>
    <div>
        <h2>Pagina principal</h2>
        <p>{{ userStore.userData?.email }}</p>

        <add-form></add-form>

        <p v-if="databaseStore.loadingDoc">cargando documentos...</p>
        <ul v-else>
            <li v-for="item in databaseStore.documents" :key="item.id">
                {{ item.id }} : {{ item.name }} - {{  item.short }}
                <br>
                <button @click="router.push(`/editar/${item.id}`)">Editar</button>
                <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
            </li>
        </ul>
    </div>
</template>