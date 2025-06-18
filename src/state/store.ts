import { proxy, subscribe } from 'valtio';
import type { Step2State, CustomTarget, Coordinates } from './step2State';

const initialState: Step2State = {
  mode: 'praesidium',
  selectedReviere: [],
  customTargets: [],
  selectedPraesidium: null,
  searchQuery: '',
  isLoading: false,
  geocodingCache: new Map<string, Coordinates>(),
};

export const step2Store = proxy<Step2State>(initialState);

// Persist in session storage
type PersistedState = Pick<Step2State, 'selectedReviere' | 'customTargets' | 'mode'>;

const persistKey = 'rk-step2';

const saved = sessionStorage.getItem(persistKey);
if (saved) {
  try {
    const parsed: PersistedState = JSON.parse(saved);
    step2Store.selectedReviere = parsed.selectedReviere;
    step2Store.customTargets = parsed.customTargets;
    step2Store.mode = parsed.mode;
  } catch {
    // ignore
  }
}

subscribe(step2Store, () => {
  const snapshot: PersistedState = {
    selectedReviere: step2Store.selectedReviere,
    customTargets: step2Store.customTargets,
    mode: step2Store.mode,
  };
  sessionStorage.setItem(persistKey, JSON.stringify(snapshot));
});
