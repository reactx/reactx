/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import React, { type Portal, type Element } from 'react';

const without = require('lodash/without');
type DragDropProviderProps = {|
  children: Element<any> | Portal,
|};

type State = {
  item: any,
  sourceId: string | null,
  targetId: string,
  targetIds: string[],
  didDrop: boolean
};

type Action = {
  item: any,
  sourceId: string,
  targetId: string,
  type: String,
};

const initialState = {};
const dndReducer = (state: State, action: Action>) => {
  const { payload } = action;
  switch (action.type) {
    case 'BEGIN_DRAG':
      return {
        ...state,
        item: payload.item,
        sourceId: payload.sourceId,
        didDrop: false,
      }
    case 'REMOVE_TARGET':
      if (state.targetIds.indexOf(payload.targetId) === -1) {
        return state
      }
      return {
        ...state,
        targetIds: without(state.targetIds, payload.targetId),
      }
    case 'DROP':
        return {
          ...state,
          didDrop: true,
          targetIds: [],
        }
    default:
      return state
  }
};

export const DragDropContext = React.createContext({});
export default function DragDropProvider(props: DragDropProviderProps) {
  const contextValue = useReducer(dndReducer, initialState);
  return (
    <DragDropContext.Provider value={contextValue}>
      {props.children}
    </DragDropContext.Provider>
  );
}

export const useDragDropContext = () => {
  const contextValue = useContext(DragDropContext);
  return contextValue;
};


export const DragDropConsumer = DragDropContext.Consumer;
