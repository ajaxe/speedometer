import { defineStore } from 'pinia';
import { SpeedUnit } from 'src/components/models';

export const useSpeedStore = defineStore('speedometer', {
  state: () => ({
    currentSpeed: -1,
    unit: SpeedUnit.Mpsec,
    enabled: true,
    error: '',
    ticker: -1,
  }),
  getters: {
    hasError: (state) => !!state.error,
    currentSpeedDisplay: (state) => {
      if (state.currentSpeed === -1) {
        return '--';
      }
      return convertSpeed(state.currentSpeed, state.unit);
    },
    displayColor: (state) => {
      const v = convertSpeed(state.currentSpeed, state.unit);
      if (v < 45) { return 'green' }
      else if (v < 65) { return 'orange' }
      else {
        return 'red'
      }
    }
  },
  actions: {
    setCurrentSpeed(value: number | null) {
      this.currentSpeed = value ?? -1;
    },
    setTicker() {
      let ticker = this.ticker + 1;
      if (ticker >= 100) {
        ticker = 0;
      }
      this.ticker = ticker;
    }
  },
});

const convertSpeed = (input: number, unit: string) => {
  if (unit === SpeedUnit.Kmph) {
    return parseInt(Math.ceil(input * 60 * 60 / 1000).toString());
  } else if (unit === SpeedUnit.Mph) {
    return parseInt(Math.ceil(input * 2.23693629).toString());
  }
  return parseInt(Math.ceil(input).toString());
}
