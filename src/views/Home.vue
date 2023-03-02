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

        <p v-if="databaseStore.loadingGetDoc">cargando documentos...</p>

        <a-space direction ="vertical" v-if="!databaseStore.loadingGetDoc" style="width:100%">
            <a-card v-for="item in databaseStore.documents" :key="item.id" :title="item.short">
                <template #extra>
                    <a-space>
                        <a-button type="primary" @click="router.push(`/editar/${item.id}`)">Editar</a-button>
                        <a-button danger @click="databaseStore.deleteUrl(item.id)">Eliminar</a-button>
                    </a-space>
                </template>
                <p>{{ item.name }}</p>
            </a-card>
        </a-space>
    </div>
</template>