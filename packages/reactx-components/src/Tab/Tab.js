import React, {memo, useState} from 'react';

function TabComponent(props) {
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
