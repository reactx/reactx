import React, {memo, useState} from 'react';
import {isTab, isTabPanel} from './utils/elementType';
import Tab from './Tab';
import TabPanel from './TabPanel';
import './tabs.css';
function TabsComponent(props) {
  const [activeTab, setActiveTab] = useState();

  return <ul {...props}>{props.children}</ul>;
}

const Tabs: any = memo(props => {
  return (
    <>
      <TabsComponent {...props} forwardedref={props.ref}>
        {props.children.map((element, index) => {
          if (isTab(element))
            return (
              <Tab
                onClick={() => props.onChange(element.props.id)}
                key={element.props.id}
                selected={props.value === element.props.id}
                label={element.props.label}
                {...element.props}></Tab>
            );
        })}
      </TabsComponent>
      {props.children.map((element, index) => {
        if (isTabPanel(element))
          return (
            <TabPanel
              key={element.props.index}
              selected={props.value === element.props.index}
              index={element.props.index}
              {...element.props}></TabPanel>
          );
      })}
    </>
  );
});
Tabs.tabsRole = 'Tabs';

export default Tabs;
