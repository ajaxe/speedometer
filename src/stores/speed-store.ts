import { defineStore } from 'pinia';

export const useSpeedStore = defineStore('speedometer', {
  state: () => ({
    currentSpeed: 0,
    unit: 'm-per-sec'
  }),
  getters: {
    currentSpeedDisplay: (state) => state.currentSpeed,
    displayColor: (state) => {
      if (state.currentSpeed < 45) { return 'green' }
      else if (state.currentSpeed < 65) { return 'orange' }
      else {
        return 'red'
      }
    }
  },
  actions: {
    setCurrentSpeed(value: number) {
      this.currentSpeed = value
    },
  },
});
