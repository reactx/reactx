/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import clsx from 'clsx';
import React, {forwardRef, useCallback, useState} from 'react';


export interface WidgetPropsType extends React.HTMLAttributes<HTMLDivElement>{
    title: string;
    content: string;
    limit:number;
}

const Widget:React.FC<WidgetPropsType> = ({
    className,
    children,
    limit,
    ...restProps
}) => {
    const [widgets, setWidgets] = useState([]);
    const addWidget = () => {
      if (widgets.length < limit) {
        setWidgets([
          ...widgets,
          {title: 'Shortcut Title', content: 'Shortcut Content'},
        ]);
      }
    };
  
    const removeWidget = (index: number) => {
      const newWidgets = [...widgets];
      newWidgets.splice(index, 1);
      setWidgets(newWidgets);
    };
  
    return (
      <div className={clsx('x-widget', className)} {...restProps}>
        {widgets.map((widget, index) => (
          <div key={index} className={styles.Widget__Item}>
            <div className='x-widget--body'>
              <h2>{widget.title}</h2>
              <button onClick={() => removeWidget(index)}>
                    remove
              </button>
            </div>
            <span>{widget.content}</span>
          </div>
        ))}
        {widgets.length < limit && (
          <div className='x-widget--add'>
            <button  onClick={addWidget}>
                {children}
            </button>
          </div>
        )}
      </div>
    );

}

