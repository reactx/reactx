import React, {FC, MouseEventHandler} from 'react';
import {BaseColor} from '../../inline-typed';
import {generateClass} from '../utils';

export type infoCardProps = {
  id?: string;
  radius?: 'none' | 'small' | 'normal' | 'curve' | 'pill';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  color?: BaseColor;
  number: React.ReactNode | string;
  description: React.ReactNode | string;
  outline?: boolean;
  inline?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
};

const InfoCardComponent = (props: infoCardProps) => {
  return (
    <div
      id={props.id}
      onClick={props.onClick}
      className={
        generateClass(props, 'info-card') +
        (props.inline ? ' info-card-inline' : '')
      }>
      <span className="info-card-number">{props.number}</span>
      <p className="info-card-description">{props.description}</p>
    </div>
  );
};

const InfoCard: FC<infoCardProps> = React.forwardRef((props) => (
  <InfoCardComponent {...props} />
));
InfoCard.defaultProps = {
  color: 'normal',
  radius: 'normal',
  shadow: 'none',
};
export {InfoCard};
