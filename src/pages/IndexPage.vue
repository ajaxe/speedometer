<template>
  <q-page class="flex flex-center">
    <div class="column">
      <div class="col">
        <q-card class="layout">
          <q-card-section class="row justify-center q-pb-xs" v-if="!enabled">
            <q-item-section class="col-auto">
              <NotEnabledDisplay />
            </q-item-section>
          </q-card-section>
          <template v-else>
            <q-card-section class="row justify-center q-pb-xs" v-if="hasError">
              <q-item-section class="col-auto">
                <ErrorMessageDisplay />
              </q-item-section>
            </q-card-section>
            <q-card-section class="row justify-center q-pb-xs">
              <q-item-section class="col-auto">
                <TickerDisplay /> <UnitSelector />
              </q-item-section>
            </q-card-section>
            <q-card-section class="row justify-center q-pt-xs">
              <q-item-section class="col-auto">
                <SpeedDisplay />
              </q-item-section>
            </q-card-section>
          </template>
        </q-card>
      </div>

      <div class="col">
        <q-card class="layout q-mt-md">
          <q-card-section class="row justify-center">
            <q-item-section class="col-auto">
              <ScreenWake />
            </q-item-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.layout {
  width: 90vw;
  max-width: 500px;
}
</style>

<script lang="ts" setup>
import { computed } from 'vue';
import { start } from '../services/speed-sensor';
import { useSpeedStore } from '../stores/speed-store';
import TickerDisplay from '../components/TickerDisplay.vue';
import ErrorMessageDisplay from '../components/ErrorMessageDisplay.vue';
import NotEnabledDisplay from '../components/NotEnabledDisplay.vue';
import SpeedDisplay from '../components/SpeedDisplay.vue';
import UnitSelector from '../components/UnitSelector.vue';
import ScreenWake from '../components/ScreenWake.vue';

const store = useSpeedStore();
const enabled = computed(() => store.enabled);
const hasError = computed(() => store.hasError);
start();
</script>
