<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";

const userStore = useUserStore();
const databaseStore = useDatabaseStore();

const url = ref("");
const handleSubmit = () =>{
    // validaciones de URL...
    databaseStore.addUrls(url.value);
}

databaseStore.getUrls();
</script>

<template>
    <div>
        <h2>Pagina principal</h2>
        <p>{{ userStore.userData?.email }}</p>

        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese una URL" v-model="url">
            <button type="submit">Enviar</button>
        </form>

        <p v-if="databaseStore.loadingDoc">cargando documentos...</p>
        <ul v-else>
            <li v-for="item in databaseStore.documents" :key="item.id">
                {{ item.id }} : {{ item.name }} - {{  item.short }}
                <br>
                <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
            </li>
        </ul>
    </div>
</template>