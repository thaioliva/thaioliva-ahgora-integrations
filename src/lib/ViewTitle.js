import React from 'react';
import RouterUtils from 'utils/RouterUtils';

const ViewTitle = (props) => {

  let period = '';
  let description = '';

  if (!props.title) {
    if (RouterUtils.constant('isAllLines')) description = 'All Lines';
    if (RouterUtils.constant('isOneLine')) description = `Line ${props.urlParams.componentId}`;
    if (RouterUtils.constant('isDay')) period = 'Today';
    if (RouterUtils.constant('isWeek')) period = 'This Week';
    if (RouterUtils.constant('isMonth')) period = 'This Month';
    if (RouterUtils.constant('isCustomRange')) period = 'Custom Range';
  }

  let title = `${period} - ${description}`;

  if (props.title) title = props.title;

  return (
    <div className="title is-featured">
      {title}
    </div>
  );

};

export default ViewTitle;
