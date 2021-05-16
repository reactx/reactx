import {GridReadyEvent} from 'ag-grid-community';
import {useCallback} from 'react';

export function useComposeHandlers() {
  const composeEventHandlers = useCallback(
    (
      internal: (e: KeyboardEvent) => void,
      external: (e: KeyboardEvent) => void,
    ) => {
      return external
        ? (e: KeyboardEvent) => {
            internal(e);
            external(e);
          }
        : internal;
    },
    [],
  );

  const composeGridHandlers = useCallback(
    (
      internal: (e: GridReadyEvent) => void,
      external: (e: GridReadyEvent) => void,
    ) => {
      return external
        ? (e: GridReadyEvent) => {
            internal(e);
            external(e);
          }
        : internal;
    },
    [],
  );

  return {composeEventHandlers, composeGridHandlers};
}
