import React, {useCallback} from 'react';

type TabListType = {
  className?: string;
  children: React.ReactNode;
  value?: number;
  onChange: (index: number) => void;
};

export default function TabList(props: TabListType) {
  const {className = '', children, value, onChange} = props;
  const getChildrens = useCallback(() => {
    const childrens = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      return React.cloneElement(child, {
        selected: child.props.name === value,
        onChange,
      });
    });
    return childrens;
  }, [value, onChange, children]);

  return (
    <ul className={'s-tab-list ' + className} role="tablist">
      {getChildrens()}
    </ul>
  );
}
