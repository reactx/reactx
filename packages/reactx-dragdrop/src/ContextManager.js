/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import React, {
  type Portal,
  type Element,
  createContext,
  useContext,
  useReducer,
} from 'react';
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
        ...payload,
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
        ...payload,
      };
    case Actions.DROP:
      return {
        ...state,
        ...payload,
        didDrop: true,
        targetIds: [],
      };
    default:
      return state;
  }
};

const DragDropContext = createContext(initialState);

export default function DragDropProvider(props: DragDropProviderProps) {
  const context = useReducer(dndReducer, initialState);

  return (
    <DragDropContext.Provider value={context}>
      {props.children}
    </DragDropContext.Provider>
  );
}

export const useDragDropContext = () => {
  const [item, dispatch] = useContext(DragDropContext);
  return {item, dispatch};
};
