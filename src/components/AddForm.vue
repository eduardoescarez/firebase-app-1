<script setup>
import { reactive } from 'vue';

const addForm = reactive({
    url:''
})

const onFinish = (value) => {
    console.log("Resultado:" + value)
}
</script>

<template>
    <a-form name="addForm" autocomplete="off" layout="vertical" :model="addForm" @finish="onFinish">
        <a-form-item name="url" label="Ingresa una URL" :rules="[{required: true, whitespace: true, pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, message: 'Ingresa una URL válida'}]">
            <a-input v-model:value="addForm.url"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit">Agregar URL</a-button>
        </a-form-item>
    </a-form>
</template>