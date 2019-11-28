import React, {memo, useState} from 'react';

function TabPanelComponent(props) {
  const [activeTab, setActiveTab] = useState();

  return (
    <div className={props.selectedPanelClassName || 'selected'} {...props}>
      {props.forceRender || props.selected ? props.children : null}
    </div>
  );
}

const TabPanel: any = memo((props) => {
  return (
    <TabPanelComponent {...props} forwardedref={props.ref}>
      {props.children}
    </TabPanelComponent>
  );
});
TabPanel.tabsRole = 'TabPanel';

export default TabPanel;
