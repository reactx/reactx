import {GridReadyEvent} from 'ag-grid-community';
import * as agGridEnterprise from 'ag-grid-enterprise';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import React, {useCallback} from 'react';
import {useComposeHandlers} from '../hooks/useComposeHandlers';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

agGridEnterprise.LicenseManager.setLicenseKey(
  'DownloadDevTools_COM_NDEwMjM0NTgwMDAwMA==59158b5225400879a12a96634544f5b6',
);

export type agGridProps = {
  id?: string;
  wrapperClassName?: string;
  enableRtl?: boolean;
  animateRows?: boolean;
  pagination?: boolean;
  enableRangeSelection?: boolean;
  suppressMovableColumns?: boolean;
  treeData?: boolean;
  suppressCellSelection?: boolean;
  suppressContextMenu?: boolean;
  paginationAutoPageSize?: boolean;
  paginationPageSize?: number;
  rowData: any;
  columns: Array<agGridItems>;
  cacheBlockSize?: any;
  statusBar?: any;
  rowModelType?: any;
  rowClassRules?: any;
  rowSelection: 'single' | 'multiple';
  //Action
  onSelectionChanged?: void;
  onGridReady(event: GridReadyEvent): void;
  onPaginationChanged?: void;
  onRowDoubleClicked?: void;
  onRowSelected?: void;
  onCellClicked?: void;
};

export type agGridItems = {
  field: string;
  headerName: string;
  sortable: boolean;
  filter: boolean;
};

const AgGridComponent = (props: agGridProps) => {
  const {composeGridHandlers} = useComposeHandlers();

  const onGridReady = useCallback((event: GridReadyEvent) => {
    const resize = (e: Event) => {
      event.api.sizeColumnsToFit();
    };
    window.addEventListener('resize', resize);
  }, []);

  return (
    <div className={props.wrapperClassName || ''}>
      <AgGridReact
        onGridReady={composeGridHandlers(onGridReady, props.onGridReady)}>
        {props.columns.map((item: agGridItems, index: number) => (
          <AgGridColumn
            key={index}
            field={item.field}
            headerName={item.headerName || item.field}
            sortable={item.sortable}
            filter={item.filter}
          />
        ))}
      </AgGridReact>
    </div>
  );
};

const AgGrid = React.forwardRef<HTMLDivElement, agGridProps>((props, ref) => (
  <AgGridComponent {...props} />
));

AgGrid.defaultProps = {
  paginationPageSize: 25,
  rowSelection: 'single',
  wrapperClassName: 'ag-theme-alpine',
};
export {AgGrid};
