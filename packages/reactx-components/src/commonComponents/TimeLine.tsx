import React, {FC} from 'react';
import {generateClass} from '../types';

export type timeLineProps = {
  id?: string;
  items: Array<timeLineItem>;
  className?: string;
};

export type timeLineItem = {
  date: string;
  title: string;
  description: string;
};

const TimeLineComponent = (props: timeLineProps) => {
  return (
    <div id={props.id} className={generateClass(props, 'timeline')}>
      {props.items.map((item: timeLineItem, index: number) => (
        <div key={index} className="timeline-item">
          <div className="timeline-date">{item.date}</div>
          <div className="timeline-data">
            <div className="timeline-title">{item.title}</div>
            <div className="timeline-description">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TimeLine: FC<timeLineProps> = React.forwardRef((props) => (
  <TimeLineComponent {...props} />
));
export {TimeLine};
