import { useSpeedStore } from 'src/stores/speed-store';

let wakeLock = null;

export const initialize = async () => {
  let isSupported = 'wakeLock' in navigator;
  let error = '';
  let lockAcquired = false;
  try {

    wakeLock = await navigator.wakeLock.request('screen');
    console.log('acquired screen lock');

    wakeLock.addEventListener('release', () => {
      // the wake lock has been released
      OnRelease();
    });

    lockAcquired = true;

  } catch (err) {
    isSupported = false;
    error = JSON.stringify(err);
    console.log(err);
    lockAcquired = false;
  }

  return {
    isSupported,
    error,
    lockAcquired
  };
};

export const release = (): Promise<boolean> => {
  if (wakeLock) {
    return wakeLock.release()
      .then(() => {
        wakeLock = null;
        return true;
      });
  }
  return Promise.resolve(false);
}
function OnRelease() {
  console.log('invoking OnRelease');
  useSpeedStore().screenWakeOnRelease();
}

document.addEventListener('visibilitychange', async () => {
  console.log('invoking visibilitychange');
  if (wakeLock !== null && document.visibilityState === 'visible') {
    useSpeedStore().screenWakeInitialize();
  }
});
