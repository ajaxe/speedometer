<template>
  <q-btn
    icon="phonelink_lock"
    round
    :size="props.size"
    push
    :class="stateColor"
    @click="toggleScreenWake"
  />
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useSpeedStore } from 'src/stores/speed-store';

const store = useSpeedStore();

const props = defineProps({
  size: {
    type: String,
    default: 'xl',
  },
});

const stateColor = computed(() => {
  if (!store.screenWakeSupported) {
    return 'text-grey-14';
  } else if (store.screenWakeEnabled) {
    return 'text-primary';
  }
  return '';
});

const toggleScreenWake = () => {
  if (!store.screenWakeSupported) {
    return;
  }
  if (store.screenWakeEnabled) {
    store.setScreenWake(false);
  } else {
    store.setScreenWake(true);
  }
};

store.screenWakeInitialize();
</script>
