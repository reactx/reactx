export const typeOfComponent = (component: any): string =>
  (typeof component?.type === 'object' && component.type)?.displayName ||
  undefined;
