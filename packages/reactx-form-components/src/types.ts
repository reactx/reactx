export type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light';
export type ButtonVariant =
  | 'small'
  | 'normal'
  | 'large'
  | 'rounded'
  | 'icon'
  | 'upload'
  | 'badge'
  | 'float';

export const typeOfComponent = (component: any): string =>
  (typeof component?.type === 'object' && component.type)?.displayName ||
  undefined;
