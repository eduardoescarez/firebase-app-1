<script setup>
import { reactive } from "vue";
import { useDatabaseStore } from "../stores/database";
import { message } from "ant-design-vue";

const databaseStore = useDatabaseStore();

const addForm = reactive({
    url:"",
})

const onFinish = async (value) => {
    const error = await databaseStore.addUrls(addForm.url);
    if (!error){
        addForm.url = "";
        return message.success("URL agregada");
    }
    switch (error){ // requiere agregar los errores de firestore
        default:
            message.error ("Ocurrió un error en el servidor. Intentelo más tarde")
        break;
    }
}
</script>

<template>
    <a-form name="addForm" autocomplete="off" layout="vertical" :model="addForm" @finish="onFinish">
        <a-form-item name="url" label="Ingresa una URL" :rules="[{required: true, whitespace: true, pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, message: 'Ingresa una URL válida'}]">
            <a-input v-model:value="addForm.url"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" :loading="databaseStore.loadingAddDoc" :disabled="databaseStore.loadingAddDoc" >Agregar URL</a-button>
        </a-form-item>
    </a-form>
</template>