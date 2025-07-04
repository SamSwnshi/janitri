import { configureStore } from "@reduxjs/toolkit";
import devicesReducer from './slices/devicesSlice';
import facilitiesReducer from './slices/facilitiesSlice';
import visitsReducer from './slices/visitsSlice';
import contractsReducer from './slices/contractsSlice';
import alertsReducer from './slices/alertsSlice';
import installationsReducer from './slices/installationsSlice';
const PERSISTED_KEYS = [
    'devices',
  'facilities',
  'visits',
  'contracts',
  'alerts',
  'installations',
]

function loadState() {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (!serializedState) return undefined;
    const state = JSON.parse(serializedState);
    // Only return persisted keys
    return Object.fromEntries(
      PERSISTED_KEYS.map(key => [key, state[key] || undefined])
    );
  } catch (e) {
    return undefined;
  }
}

function saveState(state) {
  try {
    const toPersist = Object.fromEntries(
      PERSISTED_KEYS.map(key => [key, state[key]])
    );
    localStorage.setItem('reduxState', JSON.stringify(toPersist));
  } catch (e) {}
}

const store = configureStore({
  reducer: {
    devices: devicesReducer,
    facilities: facilitiesReducer,
    visits: visitsReducer,
    contracts: contractsReducer,
    alerts: alertsReducer,
    installations: installationsReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store; 
