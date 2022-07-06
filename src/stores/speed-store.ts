import { defineStore } from 'pinia';
import { SpeedUnit } from 'src/components/models';

export const useSpeedStore = defineStore('speedometer', {
  state: () => ({
    currentSpeed: -1,
    unit: SpeedUnit.Mpsec
  }),
  getters: {
    currentSpeedDisplay: (state) => {
      if (state.currentSpeed === -1) {
        return '--';
      }
      return convertSpeed(state.currentSpeed, state.unit);
    },
    displayColor: (state) => {
      if (state.currentSpeed < 45) { return 'green' }
      else if (state.currentSpeed < 65) { return 'orange' }
      else {
        return 'red'
      }
    }
  },
  actions: {
    setCurrentSpeed(value: number | null) {
      console.log('setCurrentSpeed: ' + value);
      //this.currentSpeed = value ?? -1;
    },
  },
});

const convertSpeed = (input: number, unit: string) => {
  if (unit === SpeedUnit.Kmph) {
    return parseInt(Math.ceil(input * 60 * 60 / 1000).toString());
  }
  return parseInt(Math.ceil(input).toString());
}
