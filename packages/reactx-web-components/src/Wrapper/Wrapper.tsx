/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

export const Wrapper = ({children,condition,wrapper}: {children: React.ReactNode,condition: any,wrapper:any}) =>
  condition? wrapper(children): children
