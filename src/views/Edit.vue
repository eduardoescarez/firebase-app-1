<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from "../stores/database";

const route = useRoute();
const databaseStore = useDatabaseStore();
const url = ref("");
const handleSubmit = () => {

    // validaciones del input por ingresar

    databaseStore.updateUrl(route.params.id, url.value)
}

onMounted(async() => {
    url.value = await databaseStore.readUrl(route.params.id);
})
</script>

<template>

    <div>
        <h1>Editar id: {{ route.params.id }}</h1>
    </div>

    <div>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese una URL" v-model="url">
            <button type="submit">Enviar</button>
        </form>
    </div>

</template>