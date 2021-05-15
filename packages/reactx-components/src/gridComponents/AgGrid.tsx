import React, {useRef, useEffect, FC} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import * as agGridEnterprise from 'ag-grid-enterprise';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

agGridEnterprise.LicenseManager.setLicenseKey(
  'DownloadDevTools_COM_NDEwMjM0NTgwMDAwMA==59158b5225400879a12a96634544f5b6',
);

export type agGridProps = {
  id?: string;
  className?: string;
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
  onSelectionChanged?: () => void;
  onGridReady?: () => void;
  onPaginationChanged?: () => void;
  onRowDoubleClicked?: () => void;
  onRowSelected?: () => void;
  onCellClicked?: () => void;
};

export type agGridItems = {
  field: string;
  headerName: string;
  sortable: boolean;
  filter: boolean;
};

const AgGridComponent = (props: agGridProps) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const resize = (e: Event) => {
      gridRef.current.api.sizeColumnsToFit();
    };

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [gridRef.current]);

  return (
    <AgGridReact
      ref={gridRef}
      {...props}
      className={'ag-theme-alpine ' + (props.className ? props.className : '')}>
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
  );
};

const AgGrid: FC<agGridProps> = React.forwardRef((props) => (
  <AgGridComponent {...props} />
));

AgGrid.defaultProps = {
  paginationPageSize: 25,
  rowSelection: 'single',
};
export {AgGrid};
