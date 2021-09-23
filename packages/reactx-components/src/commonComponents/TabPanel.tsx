import React from 'react';

type TabPanelType = {
  children: React.ReactNode;
  className?: string;
  index?: number | string | undefined;
  value?: number | string | undefined;
};

export default function TabPanel(props: TabPanelType) {
  const {index, children, value, className = ''} = props;

  return (
    <div
      hidden={value !== index}
      className={'s-tab-panel ' + className}
      role="tab">
      {children}
    </div>
  );
}
