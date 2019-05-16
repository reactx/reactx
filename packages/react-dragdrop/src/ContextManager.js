/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, {type Portal, type Element} from 'react';
import DragDropManager, {type DragDropManagerType} from './DragDropManager';

type DragDropProviderProps = {|
  children: Element<any> | Portal,
|};

export const DragDropContext = React.createContext<DragDropManagerType>({});
export default function DragDropProvider(props: DragDropProviderProps) {
  const manager = DragDropManager();
  return (
    <DragDropContext.Provider value={manager}>
      {props.children}
    </DragDropContext.Provider>
  );
}

export const DragDropConsumer = DragDropContext.Consumer;
