import { useState, useCallback, useRef, useEffect } from 'react';

type UseStateWithCallbackType<T> = [
  state: T,
  updateState: (newState: (prev: T) => T, cb?: () => void) => void,
];

export const useStateWithCallback = <T>(initialState: T): UseStateWithCallbackType<T> => {
  const [state, setState] = useState<T>(initialState);
  const cbRef = useRef<((state: T) => void) | null>();

  const updateState = useCallback((newState: (prev: T) => T, cb?: () => void) => {
    if (cb) {
      cbRef.current = cb;
    }

    setState((prev: T) => newState(prev));
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, updateState];
};
