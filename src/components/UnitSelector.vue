<template>
  <div>
    <q-btn-toggle
      v-model="model"
      flat
      no-caps
      toggle-color="primary"
      stretch
      :options="[
        { label: 'm/sec', value: SpeedUnit.Mpsec },
        { label: 'km/hr', value: SpeedUnit.Kmph },
      ]"
      @update:model-value="updateUnit"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useSpeedStore } from '../stores/speed-store';
import { SpeedUnit } from '../components/models';

const store = useSpeedStore();

const model = ref(store.unit);

const updateUnit = (value: string) => {
  store.unit = value;
};
</script>
