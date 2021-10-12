import * as comunityModules from '@ag-grid-community/all-modules';
import * as enterpriseModules from '@ag-grid-enterprise/all-modules';
import {GridApi, GridReadyEvent} from '@ag-grid-community/core';
import {AgGridReact} from '@ag-grid-community/react';
import {AgGridReactProps} from '@ag-grid-community/react/lib/interfaces';
import * as agGridEnterprise from '@ag-grid-enterprise/core';
import React, {
  ForwardedRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import Column from './Column';

agGridEnterprise.LicenseManager.setLicenseKey(
  'DownloadDevTools_COM_NDEwMjM0NTgwMDAwMA==59158b5225400879a12a96634544f5b6',
);
export interface GridPropsType
  extends Omit<AgGridReactProps, 'rowModelType' | 'rowSelection'> {
  forawardedRef?: ForwardedRef<AgGridReact>;
  rowModelType?: 'clientSide' | 'infinite' | 'viewport' | 'serverSide';
  rowSelection?: 'multiple' | 'single';
}
const GridComponent = (props: GridPropsType) => {
  const {
    forawardedRef,
    onGridReady,
    children,
    modules,
    rowModelType,
    defaultColDef,
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

  return (
    <AgGridReact
      rowModelType={rowModelType}
      defaultColDef={{
        flex: 1,
        minWidth: 100,
        filter: true,
        ...defaultColDef,
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
  suppressRowClickSelection: true,
  maxConcurrentDatasourceRequests: 1,
  infiniteInitialRowCount: 1,
  maxBlocksInCache: 10,
  cacheOverflowSize: 2,
};
export default Object.assign(Grid, {
  Column,
});
