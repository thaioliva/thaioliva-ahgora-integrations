import React from 'react';

import { prettyNumber } from 'utils/utilsFn';

const YTick = (props) => (
  <text x={props.x} y={props.y}>
    <tspan x={(props.x)} dy="4" textAnchor="end">
      {prettyNumber(props.payload.value, 2, 'pt-BR').formatted}{props.isPercentage ? '%' : ''}
    </tspan>
  </text>
);
export default YTick;
