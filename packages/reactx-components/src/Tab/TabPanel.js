import React, {memo, useState, useMemo} from 'react';

type TabPanelTypeProps = {};
type DefaultTabPanelTypeProps = {};

function createDefaultProps(): DefaultTabPanelTypeProps {
  return {
    className: '',
    forceRender: false,
    selected: false,
    label: 'Label',
  };
}

function TabPanelComponent(userProps: TabPanelTypeProps) {
  const [activeTab, setActiveTab] = useState();
  const defaultProps = useMemo(() => {
    return {...createDefaultProps()};
  }, []);

  const props: TabPanelTypeProps = Object.assign(
    {},
    {...defaultProps},
    {...userProps},
  );

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
