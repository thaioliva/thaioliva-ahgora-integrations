import React from 'react';

import moment from 'moment';

import RouterUtils from 'utils/RouterUtils';

const XTick = (props) => {
  if (props.index === 0 && props.hideFirstTick) return null;

  if (RouterUtils.constant('isDay')) {
    let hour = (props.isMultiline) ? props.payload.value : moment(props.payload.value).format('HH');
    return (
      <text x={props.x} y={props.y}>
        <tspan x={props.x} dy="15" textAnchor="middle" fill="#666">
          {hour}h
        </tspan>
      </text>
    );
  }

  const isByWeek = RouterUtils.constant('aggregationSize') === 'week';
  const isByMonth = RouterUtils.constant('aggregationSize') === 'month';

  if (
    (RouterUtils.constant('isMonth') && isByWeek) ||
    (RouterUtils.constant('isCustomRange') && isByWeek)
  ) {
    return (
      <text x={props.x} y={props.y}>
        <tspan x={props.x} dy="15" textAnchor="middle">
          {'CW ' + moment(props.payload.value).format('WW').toUpperCase()}
        </tspan>
        <tspan x={props.x} dy="22" textAnchor="middle" fill="#666">
          {moment(props.payload.value).format('DD/MM')}
        </tspan>
      </text>
    );
  }

  if (RouterUtils.constant('isCustomRange') && isByMonth) {
    return (
      <text x={props.x} y={props.y}>
        <tspan x={props.x} dy="15" textAnchor="middle">
          {moment(props.payload.value).format('MMM').toUpperCase()}
        </tspan>
      </text>
    );
  }

  return (
    <text x={props.x} y={props.y}>
      <tspan x={props.x} dy="15" textAnchor="middle">
        {moment(props.payload.value).format('ddd').toUpperCase()}
      </tspan>
      <tspan x={props.x} dy="22" textAnchor="middle" fill="#666">
        {moment(props.payload.value).format('DD/MM')}
      </tspan>
    </text>
  );

};

export default XTick;
