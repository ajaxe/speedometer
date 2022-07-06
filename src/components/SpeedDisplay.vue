<template>
  <div class="q-mt-lg">
    <strong
      class="text-h1 large"
      :class="[displayColor]"
      v-text="store.currentSpeedDisplay"
    ></strong>
  </div>
</template>

<style scoped lang="scss">
.large {
  font-size: 15rem;
}
</style>

<script lang="ts" setup>
import { computed } from 'vue-demi';
import { useSpeedStore } from '../stores/speed-store';

const store = useSpeedStore();
const displayColor = computed(() => `text-${store.displayColor}-4`);
</script>
