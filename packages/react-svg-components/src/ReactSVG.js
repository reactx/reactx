/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export type Errback = (error: Error | null, svg?: Element) => void;

import Task from './Task/Task';
import Rect from './Rect/Rect';

const ReactSVG = {
  Task,
  Rect,
};

export default ReactSVG;
