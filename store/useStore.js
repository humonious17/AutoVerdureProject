import { useMemo } from 'react';
import { initializeStore } from './store';

export const useStore = (initialState) => {
  return useMemo(() => initializeStore(initialState), [initialState]);
};