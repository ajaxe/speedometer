import { useSpeedStore } from 'src/stores/speed-store';

const store = useSpeedStore();

export const start = () => {
  if (navigator.geolocation) {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        maximumAge: 0,
        timeout: 500,
        enableHighAccuracy: true
      });
    }, 1000);
  } else {
    store.enabled = false;
  }
}

const onSuccess = (position: GeolocationPosition) => {
  store.setCurrentSpeed(position.coords.speed);
  store.setTicker();
};

const onError = (positionError: GeolocationPositionError) => {
  store.error = JSON.stringify(positionError);
  store.setTicker();
};
