<script setup>

import { computed } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const textUppercase = computed (() => userStore.userData.toUpperCase() );

</script>


<template>
    <div>
        <h2>Pagina de acceso</h2>
        <p>{{ textUppercase }}</p>
        <p>{{ userStore.undercase }}</p>
    </div>
</template>

