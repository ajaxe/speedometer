<template>
  <div class="">
    <span
      class="text-h1 large"
      :class="[displayColor]"
      v-text="store.currentSpeedDisplay"
    ></span>
  </div>
</template>

<style scoped lang="scss">
$size: 11rem;
.large {
  font-size: $size;
  line-height: $size;
}
</style>

<script lang="ts" setup>
import { computed } from 'vue-demi';
import { useSpeedStore } from '../stores/speed-store';

const store = useSpeedStore();
const displayColor = computed(() => `text-${store.displayColor}-4`);
</script>
