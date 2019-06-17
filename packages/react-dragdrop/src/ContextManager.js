/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import React, {type Portal, type Element} from 'react';
import without from 'lodash/without';
import {type State, type Action} from '../inline-typed';
import {Actions} from './ActionTypes';

type DragDropProviderProps = {|
  children: Element<any> | Portal,
|};

const initialState = {};
const dndReducer = (state: State, action: Action) => {
  const {payload} = action;
  switch (action.type) {
    case Actions.BEGIN_DRAG:
      return {
        ...state,
        source: payload.source,
        sourceId: payload.sourceId,
        clonable: payload.clonable || false,
        didDrop: false,
      };
    case Actions.REMOVE_TARGET:
      if (state.targetIds.indexOf(payload.targetId) === -1) {
        return state;
      }
      return {
        ...state,
        targetIds: without(state.targetIds, payload.targetId),
      };
    case Actions.DRAG_ENTER:
      return {
        ...state,
        sourceId: payload.sourceId,
        source: payload.source,
        targetId: payload.targetId,
        target: payload.target,
      };
    case Actions.DROP:
      return {
        ...state,
        newItem: payload.newItem,
        sourceId: payload.sourceId,
        source: payload.source,
        targetId: payload.targetId,
        target: payload.target,
        didDrop: true,
        targetIds: [],
      };
    default:
      return state;
  }
};

const DragDropContext = React.createContext(initialState);

export default function DragDropProvider(props: DragDropProviderProps) {
  const context = React.useReducer(dndReducer, initialState);

  return (
    <DragDropContext.Provider value={context}>
      {props.children}
    </DragDropContext.Provider>
  );
}

export const useDragDropContext = () => {
  const [contextValue, dispatch] = React.useContext(DragDropContext);
  return [contextValue, dispatch];
};
