<script setup>

import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const formLogin = reactive({
    email: "",
    password: ""
})

const handleSubmit = async() => {
    await userStore.loginUser(formLogin.email, formLogin.password);
    router.push("/");
}

const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
};

</script>


<template>
    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 18, offset: 3 }" :lg="{ span: 12, offset: 6 }"><h2>Acceso</h2></a-col>
    </a-row>
    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 18, offset: 3 }" :lg="{ span: 12, offset: 6 }">
        <a-form name="login" layout="vertical" :model="formLogin" @finish="handleSubmit" @finishFailed="onFinishFailed">  
            <a-form-item name="email" label="Dirección de email" :rules="[{required: true, whitespace:true, type: 'email', message: 'Ingresa una dirección de email'}]">
                <a-input v-model:value="formLogin.email"></a-input>
            </a-form-item>
            <a-form-item  name="password" label="Contraseña" :rules="[{required: true, min: 6, message: 'Ingresa una contraseña con un mínimo de 6 caracteres'}]">
                <a-input-password v-model:value="formLogin.password"></a-input-password>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser">Ingresar</a-button>
            </a-form-item>
        </a-form>
        </a-col>
    </a-row>
</template>