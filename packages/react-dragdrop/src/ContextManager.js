/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import DragDropManager from './DragDropManager'
type DragDropProviderProps = {|
  children: Element < any >,
|}

export const DragDropContext = React.createContext({});
export default function DragDropProvider(props: DragDropProviderProps) {
  const manager = DragDropManager();
  return (
    <DragDropContext.Provider value={manager}>
      {props.children}
    </DragDropContext.Provider>
  )
}

export const DragDropConsumer = DragDropContext.Consumer;
