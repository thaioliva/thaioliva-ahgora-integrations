import React from 'react';

import ChartTooltipTitle from './ChartTooltipTitle';
import ChartTooltipCards from './ChartTooltipCards';
import { objectIsEmpty, prettyNumber, fixNumber } from 'utils/utilsFn';

import RouterUtils from 'utils/RouterUtils';

const StaticTooltip = (props) => {

  if (!props.chartData) return null;

  let currentDot = {};
  let lastDot = props.chartData[props.chartData.length - 1];

  props.chartData.forEach((item) => {
    if (item.countTotal !== null) currentDot = item;
  });

  if (objectIsEmpty(currentDot)) return null;

  const { value, token, original } = prettyNumber(lastDot.target, 2, 'pt-BR');

  let toGoalCSSClass = `chart-tooltip-item${
    original < 0 ? ' is-danger' : (original === 0 ? ' is-brand' : ' is-success')
  }`;

  const timeConstant = RouterUtils.constant;

  // Projected card data
  const projectedAbsoluteValue = prettyNumber(lastDot.linregress, 2, 'pt-BR');
  const projected = ((lastDot.linregress - lastDot.target) / lastDot.target) * 100;
  const projectedFixed = fixNumber(projected, 2, 'pt-BR');
  const projectedFormated = `(${
    projected < 0 ? projectedFixed + '%' : (projected === 0 ? projectedFixed : '+' + projectedFixed + '%')
  } of goal)`;
  const projectedCSSClass = `chart-tooltip-item${
    projected < 0 ? ' is-danger' : (projected == 0 ? ' is-brand' : ' is-success')
  }`;

  if (timeConstant('isCustomRange')) return null;

  return (
    <div className="panel-overlaid">
      <div className="chart-tooltip is-overlaid-card">

        <ChartTooltipTitle {...currentDot} hideIncomplete>
          This {RouterUtils.params.timeRange} -
        </ChartTooltipTitle>

        <ChartTooltipCards.totalProduction {...currentDot} />

        <ChartTooltipCards.scrapOnTotalProduction {...currentDot} />

        {timeConstant('isDay') ?
          <div className={toGoalCSSClass}>
            <span>Daily Goal</span>
            <span className="has-no-icon">
              {value}<span>{token}</span>
            </span>
          </div>
          : null
        }

        {timeConstant('isWeek') ?
          <div className={toGoalCSSClass}>
            <span>Weekly Goal</span>
            <span className="has-no-icon">
              {value}<span>{token}</span>
            </span>
          </div>
          : null
        }

        {timeConstant('isMonth') ?
          <div className={toGoalCSSClass}>
            <span>Monthly Goal</span>
            <span className="has-no-icon">
              {value}<span>{token}</span>
            </span>
          </div>
          : null
        }

        <div className={projectedCSSClass}>
          <span>Projected</span>
          <span className="chart-tooltip-label" style={{ color: '#888F9D' }}>
            {projectedFormated}
          </span>
          <span className="has-no-icon">
            {projectedAbsoluteValue.value}<span>{projectedAbsoluteValue.token}</span>
          </span>
        </div>

      </div>
    </div>
  );
};

export default StaticTooltip;
