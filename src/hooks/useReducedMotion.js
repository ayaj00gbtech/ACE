import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/* True when the user asks for reduced motion; follows live changes to the setting. */
export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
