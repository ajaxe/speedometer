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
let currentReportedSpeed = 0;
const onSuccess = (position: GeolocationPosition) => {
  currentReportedSpeed = position.coords.speed ?? 0;
};

const onError = (positionError: GeolocationPositionError) => {
  store.error = JSON.stringify(positionError);
  store.setTicker();
};

function limiter() {
  const timeout = 1000 + (Math.random() * 100);
  store.setCurrentSpeed(currentReportedSpeed);
  store.setTicker();

  setTimeout(limiter, timeout);
}
limiter();
