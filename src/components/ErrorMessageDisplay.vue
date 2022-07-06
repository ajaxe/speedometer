<template>
  <p>
    {{ errorMessage }}
  </p>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useSpeedStore } from 'src/stores/speed-store';

const store = useSpeedStore();
const errorMessage = ref(store.error);
</script>
