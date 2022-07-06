import { useSpeedStore } from 'src/stores/speed-store';

const store = useSpeedStore();
let timer = 0;

export const start = () => {
  if (timer == 0) {
    timer = setInterval(function () {
      let newSpeed = store.currentSpeed + 5;
      if (newSpeed >= 100) {
        newSpeed = 0
      }
      store.setCurrentSpeed(newSpeed);
    }, 1000)
  }
}
