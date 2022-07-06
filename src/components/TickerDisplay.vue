<template>
  <span>{{ ticker }}</span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSpeedStore } from 'src/stores/speed-store';

const store = useSpeedStore();
const ticker = computed(() => store.ticker);
</script>
