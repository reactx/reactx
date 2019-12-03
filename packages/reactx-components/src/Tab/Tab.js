import React, {memo, useState, useMemo} from 'react';

type TabTypeProps = {};
type DefaultTabTypeProps = {};

function createDefaultProps(): DefaultTabTypeProps {
  return {
    className: '',
    selected: false,
    label: 'Label',
  };
}
function TabComponent(userProps: TabTypeProps) {
  const defaultProps = useMemo(() => {
    return {...createDefaultProps()};
  }, []);

  const props: TabTypeProps = Object.assign(
    {},
    {...defaultProps},
    {...userProps},
  );

  return (
    <li
      {...props}
      className={props.className + ' ' + (props.selected ? 'selected' : '')}>
      {props.label}
    </li>
  );
}

const Tab: any = memo(props => {
  return (
    <TabComponent {...props} forwardedref={props.ref}>
      {props.children}
    </TabComponent>
  );
});
Tab.tabsRole = 'Tab';
export default Tab;
