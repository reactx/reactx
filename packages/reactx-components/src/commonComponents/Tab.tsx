import React, {useCallback} from 'react';

type TabType = {
  children: React.ReactNode;
  className?: string;
  title?: string;
  name: string | number;
  hidden?: boolean;
  selected?: boolean;
  tabIndex?: number | undefined;
};

function Tab(props: TabType) {
  const {className = '', children, tabIndex, selected, name, hidden} = props;
  const {onChange} = props as any;

  const handleClick = useCallback(() => {
    if (onChange) onChange(name);
  }, [name, onChange]);

  return (
    <li
      hidden={hidden}
      title={props.title}
      onClick={handleClick}
      tabIndex={tabIndex}
      className={className + (selected ? ' selected' : '')}
      role="tab">
      {children}
    </li>
  );
}

Tab.defaultPropd = {
  hidden: false,
};

export default Tab;
