<script setup>

import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import { message } from "ant-design-vue";


const userStore = useUserStore();

const formModel = reactive({
    email: "",
    password: "",
    checkpassword: ""
})

const handleSubmit = async() => {
    const error = await userStore.registerUser(formModel.email, formModel.password);

    if (!error) { 
        return message.success("Cuenta creada satisfactoriamente");
    }

    switch (error){
        case "auth/email-already-in-use":
            message.error("Esta cuenta ya esta creada");
            break;
        default:
            message.error("Problema de backend, intente nuevamente más tarde");
            break;
    }
}

const validatePassword = async(_rule, value) => {
    if (value === ""){
        return Promise.reject("Repita la contraseña ingresada anteriormente");
    }
    if (value !== formModel.password){
        return Promise.reject("No coinciden las contraseñas");
    }
    return Promise.resolve();
}

const onFinishFailed = errorInfo => {
      return message.error("Hay un error en el formulario");
};

</script>


<template>
    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 18, offset: 3 }" :lg="{ span: 12, offset: 6 }"><h2>Registro de usuarios</h2></a-col>
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
            <a-form-item  name="checkpassword" label="Reingrese la contraseña" :rules="[{required: true, min: 6, validator: validatePassword}]">
                <a-input-password v-model:value="formModel.checkpassword"></a-input-password>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser">Ingresar</a-button>
            </a-form-item>
        </a-form>
        </a-col>
    </a-row>
</template>