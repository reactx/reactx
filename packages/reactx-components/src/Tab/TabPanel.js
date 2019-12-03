import React, {memo, useState} from 'react';

function TabPanelComponent(props) {
  const [activeTab, setActiveTab] = useState();

  return (
    <div
      {...props}
      className={
        props.className + ' ' + props.selectedPanelClassName || 'selected'
      }>
      {props.forceRender || props.selected ? props.children : null}
    </div>
  );
}

const TabPanel: any = memo(props => {
  return (
    <TabPanelComponent {...props} forwardedref={props.ref}>
      {props.children}
    </TabPanelComponent>
  );
});
TabPanel.tabsRole = 'TabPanel';

export default TabPanel;
