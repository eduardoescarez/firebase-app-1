<script setup>
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();

const confirm = async(id) => {
    const error = await databaseStore.deleteUrl(id);
    if (!error) {
        return message.success("Eliminación realizada");
    }
    return message.error(error)
}

const cancel = () => {
    message.error("Operación cancelada");
}

databaseStore.getUrls();

</script>

<template>
    <div>
        <h2>Pagina principal</h2>
        <add-form></add-form>
        <p>{{ userStore.userData?.email }}</p>

        <p v-if="databaseStore.loadingGetDoc">cargando documentos...</p>

        <a-space direction ="vertical" v-if="!databaseStore.loadingGetDoc" style="width:100%">
            <a-card v-for="item in databaseStore.documents" :key="item.id" :title="item.short">
                <template #extra>
                    <a-space>
                        <a-button type="primary" @click="router.push(`/editar/${item.id}`)">Editar</a-button>
                        <a-popconfirm title="¿Confirma eliminación?" ok-text="Si" cancel-text="No" @confirm="confirm(item.id)" @cancel="cancel">
                            <a-button danger :loading="databaseStore.loadingDelDoc" :disabled="databaseStore.loadingDelDoc">Eliminar</a-button>
                        </a-popconfirm>
                    </a-space>
                </template>
                <p>{{ item.name }}</p>
            </a-card>
        </a-space>
    </div>
</template>