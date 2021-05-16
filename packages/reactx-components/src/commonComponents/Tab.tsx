import React, {useRef, useCallback, FC, MouseEventHandler} from 'react';
import {generateClass} from '../utils';

export type tabProps = {
  id?: string;
  title?: string;
  disabled?: boolean;
  className?: string;
  tabList?: Array<tabItem>;
  activeTabId?: string;
  onClick?: (item: tabItem) => void;
  setActiveTab?: (item: tabItem) => void;
  deleteTabAction?: (id: string) => void;
  addTabAction?: MouseEventHandler;
  children: React.ReactNode | string;
};

export type tabItem = {
  tabId: string;
  displayName: string;
  color: string;
  name: string;
  default: boolean;
};

const TabComponent = (props: tabProps) => {
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollTabs = useCallback((direct) => {
    if (direct === 'left' && tabsRef.current) {
      tabsRef.current.scrollLeft = tabsRef.current.scrollLeft - 100;
    } else if (direct === 'right' && tabsRef.current) {
      tabsRef.current.scrollLeft = tabsRef.current.scrollLeft + 100;
    }
  }, []);

  return (
    <div className={generateClass(props, 'tab')} id={props.id}>
      <div className="tab-container">
        {tabsRef.current?.scrollWidth !== tabsRef.current?.offsetWidth && (
          <div className="tab-action">
            <button className="reactx-btn" onClick={() => scrollTabs('left')}>
              <i className="reactx-icon nf-icon-ChevronLeft" />
            </button>
          </div>
        )}
        <div className="tabs" ref={tabsRef}>
          {props.tabList &&
            props.tabList.map((item: tabItem, index: number) => (
              <div
                id={item.tabId}
                className={
                  'tab-header-item ' +
                  (item.tabId === props.activeTabId ? 'active-tab' : '') +
                  (item.color ? ' reactx-bt-3 border-' + item.color : '')
                }
                key={index}>
                <span
                  className="tab-header-title"
                  data-tooltip={item.name || item.displayName}
                  onAuxClick={(e) => {
                    if (e.button === 1 && props.deleteTabAction) {
                      props.deleteTabAction(item.tabId);
                    }
                  }}
                  onClick={() => {
                    props.setActiveTab && props.setActiveTab(item);
                  }}>
                  {item.default && (
                    <i className="reactx-icon nf-icon-FavoriteStar" />
                  )}
                  {item.name || item.displayName}
                </span>
                {props.deleteTabAction && (
                  <span
                    className="tab-header-close-btn"
                    data-tooltip="بستن تب"
                    aria-label="بستن تب"
                    onClick={() =>
                      props.deleteTabAction && props.deleteTabAction(item.tabId)
                    }>
                    <i className="reactx-icon nf-icon-ChromeClose" />
                  </span>
                )}
              </div>
            ))}
        </div>
        {props.addTabAction && (
          <div className="tab-action">
            {tabsRef.current?.scrollWidth !== tabsRef.current?.offsetWidth && (
              <button
                className="reactx-btn"
                onClick={() => scrollTabs('right')}>
                <i className="reactx-icon nf-icon-ChevronRight" />
              </button>
            )}
            <button
              className="reactx-btn"
              data-tooltip="تب جدید"
              aria-label="تب جدید"
              onClick={props.addTabAction}>
              <i className="reactx-icon nf-icon-CalculatorAddition" />
            </button>
          </div>
        )}
      </div>
      <div className="tab-content reactx-row">{props.children}</div>
    </div>
  );
};

const Tab: FC<tabProps> = React.forwardRef((props) => (
  <TabComponent {...props} />
));
export {Tab};
