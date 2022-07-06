import { useSpeedStore } from 'src/stores/speed-store';

const store = useSpeedStore();

export const start = () => {
  navigator.geolocation.watchPosition(onSuccess, onError, {
    maximumAge: 0,
    timeout: 500,
    enableHighAccuracy: true
  });
}

const onSuccess = (position: GeolocationPosition) => {
  store.setCurrentSpeed(position.coords.speed);
};

const onError = (positionError: GeolocationPositionError) => {
  console.log(positionError);
};
