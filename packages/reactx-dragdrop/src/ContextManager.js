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
      payload.element.isDragging = true;
      return payload;
    case Actions.DRAG_ENTER:
      return {
        ...state,
        ...payload,
      };
    case Actions.DROP:
      payload.element.isDragging = false;
      return {};
    default:
      return state;
  }
};

const DragDropContextState = createContext(initialState);
const DragDropContextDispatch = createContext(null);

export default function DragDropProvider(props: DragDropProviderProps) {
  const [state, dispatch] = useReducer(dndReducer, initialState);

  return (
    <DragDropContextState.Provider value={state}>
      <DragDropContextDispatch.Provider value={dispatch}>
        {props.children}
      </DragDropContextDispatch.Provider>
    </DragDropContextState.Provider>
  );
}

export const useDragDropContextState = () => {
  const state = useContext(DragDropContextState);
  return state;
};
export const useDragDropContextDispatch = () => {
  const dispatch = useContext(DragDropContextDispatch);
  return dispatch;
};
