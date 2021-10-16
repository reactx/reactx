import * as comunityModules from '@ag-grid-community/all-modules';
import {
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
} from '@ag-grid-community/core';
import {AgGridReact} from '@ag-grid-community/react';
import {AgGridReactProps} from '@ag-grid-community/react/lib/interfaces';
import * as enterpriseModules from '@ag-grid-enterprise/all-modules';
import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import ActionButtonRenderer from './ActionButtonRenderer';
import Column from './Column';

export interface GridPropsType
  extends Omit<AgGridReactProps, 'rowModelType' | 'rowSelection'> {
  forawardedRef?: ForwardedRef<AgGridReact>;
  rowModelType?: 'clientSide' | 'infinite' | 'viewport' | 'serverSide';
  rowSelection?: 'multiple' | 'single';
  actionButtonRender?: (props: ICellRendererParams) => React.ReactNode;
}
const GridComponent = (props: GridPropsType) => {
  const {
    forawardedRef,
    onGridReady,
    children,
    modules,
    rowModelType,
    defaultColDef,
    frameworkComponents,
    actionButtonRender,
    ...restProps
  } = props;
  const gridRefApi = useRef<GridApi>();

  const allModules = useMemo(
    () => [
      ...comunityModules.AllCommunityModules,
      ...enterpriseModules.AllEnterpriseModules,
      ...(modules ? modules : []),
    ],
    [],
  );

  const composeGridHandlers = useCallback(
    (
      internal: ((event: GridReadyEvent) => void) | undefined,
      external: ((event: GridReadyEvent) => void) | undefined,
    ) => {
      return external
        ? (e: GridReadyEvent) => {
            internal && internal(e);
            external(e);
          }
        : internal;
    },
    [],
  );

  const resize = useCallback(() => {
    gridRefApi.current && gridRefApi.current.sizeColumnsToFit();
  }, [gridRefApi.current]);

  const gridReady = useCallback((event: GridReadyEvent) => {
    gridRefApi.current = event.api;
    resize();
    window.addEventListener('resize', resize);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const actionButtonRenderer = actionButtonRender
    ? forwardRef((props: any, ref: any) => {
        return (
          <ActionButtonRenderer {...props} ref={ref}>
            {actionButtonRender(props)}
          </ActionButtonRenderer>
        );
      })
    : null;

  return (
    <AgGridReact
      rowModelType={rowModelType}
      defaultColDef={{
        flex: 1,
        minWidth: 100,
        filter: true,
        ...defaultColDef,
      }}
      frameworkComponents={{
        ...frameworkComponents,
        actionButtonRenderer,
      }}
      onGridReady={composeGridHandlers(gridReady, onGridReady)}
      ref={forawardedRef}
      modules={allModules}
      {...restProps}>
      {children}
    </AgGridReact>
  );
};

const Grid = React.forwardRef<AgGridReact, GridPropsType>((props, ref) => (
  <GridComponent {...props} forawardedRef={ref} />
));

Grid.defaultProps = {
  reactUi: false, //disable for temporary errors
  className: 'ag-theme-alpine',
  rowModelType: 'clientSide',
  rowBuffer: 0,
  paginationPageSize: 100,
  rowSelection: 'single',
  suppressMultiSort: true,
  animateRows: true,
  maxConcurrentDatasourceRequests: 1,
  infiniteInitialRowCount: 1,
  maxBlocksInCache: 10,
  cacheOverflowSize: 2,
};
export default Object.assign(Grid, {
  Column,
});
