<script setup>

import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";


const userStore = useUserStore();
const router = useRouter();

const formModel = reactive({
    email: "",
    password: "",
    checkpassword: ""
})

const handleSubmit = async() => {
    const error = await userStore.loginUser(formModel.email, formModel.password);
    router.push("/");

    if (!error) { 
        return;
    }

    switch (error){
        case "auth/user-not-found":
            message.error("No existe esta cuenta");
            break;
        case "auth/wrong-password":
            message.error("Error de contraseña");
            break;
        default:
            message.error("Problema de backend, intente nuevamente más tarde");
            break;
    }
};

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
        <a-form name="login" layout="vertical" :model="formModel" @finish="handleSubmit" @finishFailed="onFinishFailed">  
            <a-form-item name="email" label="Dirección de email" :rules="[{required: true, whitespace:true, type: 'email', message: 'Ingresa una dirección de email'}]">
                <a-input v-model:value="formModel.email"></a-input>
            </a-form-item>
            <a-form-item  name="password" label="Contraseña" :rules="[{required: true, min: 6, message: 'Ingresa una contraseña con un mínimo de 6 caracteres'}]">
                <a-input-password v-model:value="formModel.password"></a-input-password>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser" :loading="userStore.loadingUser">Ingresar</a-button>
            </a-form-item>
        </a-form>
        </a-col>
    </a-row>
</template>