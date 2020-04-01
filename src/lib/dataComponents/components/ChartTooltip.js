import React from 'react';
import PropTypes from 'prop-types';
import ChartTooltipTitle from './ChartTooltipTitle';
import ChartTooltipCards from './ChartTooltipCards';

const ChartTooltip = (props) => {

  let currentDot = props.chartData.filter((item) => item.timestamp === props.label);

  if (!props.active) return null;

  currentDot = currentDot[0] || {};

  if (currentDot.countTotal === null) return null;

  const cards = props.cards.map((item, index) => {
    const Card = ChartTooltipCards[item];
    return <Card {...currentDot} key={index} />;
  });

  return (
    <div className="chart-tooltip">
      <ChartTooltipTitle isMultiline={props.isMultiline} {...currentDot} />
      {cards}
    </div>
  );
};

ChartTooltip.propTypes = {
  chartData: PropTypes.array.isRequired
};

export default ChartTooltip;
