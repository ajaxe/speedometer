<template>
  <div>
    <q-btn-toggle
      v-model="model"
      push
      glossy
      toggle-color="primary"
      :options="[
        { label: 'm/sec', value: 'm-per-sec' },
        { label: 'Km/hr', value: 'km-per-hr' },
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSpeedStore } from '../stores/speed-store';

const store = useSpeedStore();

const model = computed(() => store.unit);
</script>
