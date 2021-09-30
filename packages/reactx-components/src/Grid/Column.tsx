import {AgGridColumnProps} from '@ag-grid-community/react';
import {AgGridColumn} from '@ag-grid-community/react/lib/agGridColumn';
import React, {ForwardedRef} from 'react';

export interface ColumnPropsType extends AgGridColumnProps {
  forawardedRef?: ForwardedRef<AgGridColumn>;
}

const ColumnComponent = (props: ColumnPropsType) => {
  const {forawardedRef, ...restProps} = props;
  return <AgGridColumn ref={forawardedRef} {...restProps} />;
};

const Column = React.forwardRef<AgGridColumn, ColumnPropsType>((props, ref) => (
  <ColumnComponent {...props} forawardedRef={ref} />
));

export default Column;
