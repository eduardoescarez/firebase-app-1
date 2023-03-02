<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";
import { message } from "ant-design-vue";

const route = useRoute();

const databaseStore = useDatabaseStore();

const editForm = reactive({
    url:"",
})

onMounted(async() => {
    editForm.url = await databaseStore.readUrl(route.params.id);
})



const onFinish = async (value) => {
    const error = await databaseStore.updateUrl(route.params.id, editForm.url)
    if (!error){
        editForm.url = "";
        return message.success("URL editada");
    }
    switch (error){ // requiere agregar los errores de firestore
        default:
            message.error ("Ocurrió un error en el servidor. Intentelo más tarde")
        break;
    }
}
</script>

<template>

    
    <h1 class="text-center">Editar id: {{ route.params.id }}</h1>
    
    <a-form name="editForm" autocomplete="off" layout="vertical" :model="editForm" @finish="onFinish">
        <a-form-item name="url" label="Edita la URL" :rules="[{required: true, whitespace: true, pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, message: 'Ingresa una URL válida'}]">
            <a-input v-model:value="editForm.url"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" :loading="databaseStore.loadingEdiDoc" :disabled="databaseStore.loadingEdiDoc" >Editar URL</a-button>
        </a-form-item>
    </a-form>


</template>