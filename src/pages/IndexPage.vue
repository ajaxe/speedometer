<template>
  <q-page class="flex flex-center">
    <q-card class="layout">
      <q-card-section class="row justify-center q-pb-xs">
        <q-item-section class="col-auto">
          <UnitSelector />
        </q-item-section>
      </q-card-section>
      <q-card-section class="row justify-center q-pt-xs">
        <q-item-section class="col-auto">
          <SpeedDisplay />
        </q-item-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="scss" scoped>
.layout {
  width: 90vw;
  max-width: 500px;
}
</style>

<script lang="ts" setup>
import { start } from '../services/bootstrap';
import SpeedDisplay from '../components/SpeedDisplay.vue';
import UnitSelector from '../components/UnitSelector.vue';

start();
</script>
