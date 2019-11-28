import React, {memo, useState} from 'react';

function TabComponent(props) {
  return (
    <li className={'tab-item ' + (props.selected ? 'selected' : '')} {...props}>
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
