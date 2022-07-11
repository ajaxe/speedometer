import { useSpeedStore } from 'src/stores/speed-store';

const store = useSpeedStore();

export const start = () => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      maximumAge: 0,
      timeout: 500,
      enableHighAccuracy: true
    });
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
