import React from 'react';

import { rawNumber, fixNumber, isInvalidNumber, prettyNumber } from 'utils/utilsFn';
import { roundNumber } from 'utils/utils';
import dataHelpers from 'lib/dataHelpers';

const ChartTooltipCards = {};

ChartTooltipCards.shiftsOnTotalProduction = (props) => {
  // console.log(props);
  // const value = dataHelpers.toGoalOnTotalProduction(props);
  // if (!value) return null;
  // const CSSClass = `chart-tooltip-item${
  //   rawNumber(value) < 0 ? ' is-danger' : (rawNumber(value) == 0 ? ' is-brand' : ' is-success')
  // }`;
  let items = null;
  items = props.shifts ? props.shifts.map((shift, index) => {
    // value['shift' + index] = shift;
    // console.log(prettyNumber(shift.acumTotal, 2, 'pt-BR'));
    const { value, token } = prettyNumber(shift.acumTotal, 2, 'pt-BR');
    ///const { formatted } = prettyNumber(shift.target, 2, 'pt-BR');
    const toGoal = (isInvalidNumber(Math.floor(((shift.acumTotal - shift.targetacum) / shift.targetacum) * 100))) ? 0 : Math.floor(((shift.acumTotal - shift.targetacum) / shift.targetacum) * 100);
    const toGoalValue = ` (${
      toGoal < 0 ? toGoal + '%' : (toGoal == 0 ? toGoal : '+' + toGoal + '%')
      } of goal)`;
    let toGoalCSSClassInfoBox = `chart-tooltip-item${
      toGoal < 0 ? ' is-danger' : (toGoal == 0 ? ' is-brand' : ' is-success')
      }`;
    return (
      <div className={toGoalCSSClassInfoBox} key={index}>
        <span>Shift {index + 1} <br /><span className="subtitle-shift">{toGoalValue}</span></span>
        {shift.acumTotal === null ? <span>N.A.</span> :
          <span>
            {value}
            <span>{token}</span>
          </span>
        }
      </div>
    );
  }) : null;

  return items;
};

ChartTooltipCards.efficiencyShiftsOnTotalProduction = (props) => {
  let items = null;
  items = props.shifts ? props.shifts.map((shift, index) => {
    const { value } = prettyNumber(shift.efficiency, 2, 'pt-BR');
    return (
      <div className="chart-tooltip-item is-brand" key={index}>
        <span>Shift {index + 1} <br /></span>
        {shift.acumTotal === null ? <span>N.A.</span> :
          <span>
            {roundNumber(value)}
            <span>%</span>
          </span>
        }
      </div>
    );
  }) : null;

  return items;
};

ChartTooltipCards.toGoalOnTotalProduction = (props) => {
  const value = dataHelpers.toGoalOnTotalProduction(props);
  if (!value) return null;
  const CSSClass = `chart-tooltip-item${
    rawNumber(value) < 0 ? ' is-danger' : (rawNumber(value) == 0 ? ' is-brand' : ' is-success')
    }`;
  return (
    <div className={CSSClass}>
      <span>To Goal</span>
      <span>
        {value}<span>%</span>
      </span>
    </div>
  );
};

ChartTooltipCards.toGoalOnSinglePeriod = (props) => {
  const value = dataHelpers.toGoalOnSinglePeriod(props);
  if (!value) return null;
  const CSSClass = `chart-tooltip-item${
    rawNumber(value) < 0 ? ' is-danger' : (rawNumber(value) == 0 ? ' is-brand' : ' is-success')
    }`;
  return (
    <div className={CSSClass}>
      <span>To Goal</span>
      <span>
        {value}<span>%</span>
      </span>
    </div>
  );
};

ChartTooltipCards.scrapOnTotalProduction = (props) => {
  const value = dataHelpers.scrapOnTotalProduction(props);
  return (
    <div className="chart-tooltip-item is-danger">
      <span>Scrap</span>
      <span className="has-no-icon">
        {value}<span>%</span>
      </span>
    </div>
  );
};

ChartTooltipCards.scrapOnSinglePeriod = (props) => {
  const value = dataHelpers.scrapOnSinglePeriod(props);
  const valueIsValid = isInvalidNumber(rawNumber(value));
  return (
    <div className="chart-tooltip-item is-danger">
      <span>Scrap</span>
      <span className="has-no-icon">
        {value}{!valueIsValid ? <span>%</span> : null}
      </span>
    </div>
  );
};

ChartTooltipCards.calculatedScrap = (props) => {
  const value = dataHelpers.calculatedScrap(props);
  const valueIsValid = isInvalidNumber(rawNumber(value));
  return (
    <div className="chart-tooltip-item is-danger">
      <span>Scrap</span>
      <span className="has-no-icon">
        {value}{!valueIsValid ? <span>%</span> : null}
      </span>
    </div>
  );
};

ChartTooltipCards.totalProduction = (props) => {
  const { value, token } = dataHelpers.totalProduction(props.acumTotal);
  return (
    <div className="chart-tooltip-item">
      <span>Total production</span>
      <span>
        {value}<span>{token}</span>
      </span>
    </div>
  );
};

ChartTooltipCards.periodProduction = (props) => {
  const { value, token } = dataHelpers.totalProduction(props.countTotal);
  return (
    <div className="chart-tooltip-item">
      <span>Period Production</span>
      <span>
        {value}<span>{token}</span>
      </span>
    </div>
  );
};

ChartTooltipCards.efficiencyOnTotalProduction = (props) => {
  const value = dataHelpers.efficiencyOnTotalProduction(props);
  return (
    <div className="chart-tooltip-item">
      <span>Efficiency Progress</span>
      <span className="has-no-icon">
        {value}<span>%</span>
      </span>
    </div>
  );
};

ChartTooltipCards.averageProductionOrderTootip = (props) => {
  const { value, token } = dataHelpers.totalProduction(props.avg_production_order);

  return (
    <div className="chart-tooltip-item">
      <span>Average Production Order</span>
      <span>
        {value}<span>{token}</span>
      </span>
    </div>
  );
};

ChartTooltipCards.cntProductionOrderTootip = (props) => {
  const { value, token } = dataHelpers.totalProduction(props.cnt_production_order);

  return (
    <div className="chart-tooltip-item">
      <span>Average Production Order</span>
      <span>
        {value}<span>{token}</span>
      </span>
    </div>
  );
};

export default ChartTooltipCards;
