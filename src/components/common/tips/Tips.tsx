import React from 'react';
import './Tips.less';

export function tipsHoc(
  elem: JSX.Element,
  tip: JSX.Element,
  isLeft = true
): JSX.Element {
  return (
    <div className="tip-block">
      <div className={`tip-block__main-elem_${isLeft ? 'left' : 'right'}`}>
        {elem}
      </div>
      <div
        className={`tip-block__tip-elem tip-block__tip-elem_${
          isLeft ? 'left' : 'right'
        }`}
      >
        {tip}
      </div>
    </div>
  );
}
