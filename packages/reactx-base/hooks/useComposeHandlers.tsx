import {useCallback} from 'react';

export function useComposeHandlers() {
  const composeEventHandlers = useCallback(
    (internal: (e: Event) => void, external: (e: Event) => void) => {
      return external
        ? (e: Event) => {
            internal(e);
            external(e);
          }
        : internal;
    },
    [],
  );

  return {composeEventHandlers};
}
