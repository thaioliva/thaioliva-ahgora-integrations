import React from 'react';

const CardWraper = (props) => {
  const cssContainer = (props.cssContainer != '') ? props.cssContainer : 'funnel-card-wrapper';
  const cssValue = (props.cssChild != '') ? 'title is-5 ' + props.cssChild : 'title is-5';
  return (
    <div className={cssContainer}>
      <span className="title is-label">{props.label}</span>
      <span className={cssValue}>{props.value}</span>
    </div>
  );
};

export default CardWraper;