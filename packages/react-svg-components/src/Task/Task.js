/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React from 'react';
import ReactSVG from 'react-svg';

export default function Task() {
  return <ReactSVG
    // Required props.
    src="svg.svg"
    // Optional props.
    evalScripts="always"
    fallback={() => <span>Error!</span>}
    loading={() => <span>Loading</span>}
    onInjected={(error, svg) => {
      if (error) {
        console.error(error)
        return
      }
      console.log(svg)
    }}
    renumerateIRIElements={false}
    svgClassName="svg-class-name"
    svgStyle={{ width: 200 }}
    wrapper="div"
    // Non-documented props.
    className="wrapper-class-name"
    onClick={() => {
      console.log('wrapper onClick')
    }}
  />;
}
