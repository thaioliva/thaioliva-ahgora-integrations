import React from 'react';
import moment from 'moment';

import RouterUtils from 'utils/RouterUtils';

const ChartTooltipTitle = (props) => {

  //let hour = moment(props.timestamp).format('HH') + 'h';

  let hour = (props.isMultiline) ? props.timestamp : moment(props.timestamp).format('HH');

  let week = 'CW ' + moment(props.timestamp).format('WW') + ' - ' + moment(props.timestamp).format('DD/MM');
  week = week.toUpperCase();

  let month = moment(props.timestamp).format('dddd') + ' - ' + moment(props.timestamp).format('DD/MM');
  month = month.toUpperCase();

  let currentTime = month;

  if (RouterUtils.constant('isDay')) currentTime = hour + 'h';

  const isByWeek = RouterUtils.constant('aggregationSize') === 'week';

  if (
    (RouterUtils.constant('isMonth') && isByWeek) ||
    (RouterUtils.constant('isCustomRange') && isByWeek)
  ) currentTime = week;

  return (
    <div className="chart-tooltip-title">
      <h3 className="title is-6">
        {props.children} {currentTime}{props.incomplete && !props.hideIncomplete ? ' (Incomplete)' : ''}
      </h3>
    </div>
  );
};

export default ChartTooltipTitle;
