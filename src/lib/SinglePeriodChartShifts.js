import React from 'react';
import PropTypes from 'prop-types';

import { roundNumber, percent } from 'utils/utils';
import { prettyNumber, isInvalidNumber } from 'utils/utilsFn';

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell
} from 'recharts';

import RouterUtils from 'utils/RouterUtils';

// Constants
import { colors } from 'core/constants';
// Utils
import { convertHex } from 'utils/utilsFn';

import moment from 'moment';

const SinglePeriodChart = (props) => {

  let data = props.productionData || [];
  let legendKeys = [];
  let shiftData = [];
  data = data.map((item) => {
    if (item.linregress < 0) {
      item.linregress = 0;
    }
    item.shifts ? item.shifts.forEach((shift, index) => {
      item['shift' + index] = shift;
    }) : null;
    shiftData = item.shifts;
    return item;
  });

  let dataChart = data;

  const isDay = props.match.params.timeRange === 'day';
  const isMonth = props.match.params.timeRange === 'month';
  const isWeekly = props.match.params.aggregationSize === 'by-week';
  const isCustomRange = RouterUtils.constant('isCustomRange');

  const CustomizedXTick = (props) => {
    if (isDay) {
      return (
        <text x={props.x} y={props.y}>
          <tspan x={props.x} dy="15" textAnchor="middle" fill="#666">
            {props.payload.value}h
          </tspan>
        </text>
      );
    }
    if (isMonth && isWeekly || (isCustomRange && isWeekly)) {
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

  const CustomizedYTick = (props) => (
    <text x={props.x} y={props.y}>
      <tspan x={(props.x)} dy="4" textAnchor="end">
        {roundNumber(props.payload.value)}
      </tspan>
    </text>
  );

  const CustomizedTooltip = (props) => {
    if (!props.data) return null;
    let value = props.data.filter((item) => item.timestamp === props.label);
    value = value[0] || {};

    let items = null;
    let toGoal = 0;
    let toGoalValue = '';
    let toGoalCSSClassInfoBox = '';
    let isIncomplete = false;
    items = value.shifts ? value.shifts.map((shift, index) => {
      value['shift' + index] = shift;
      isIncomplete = shift.incomplete || false;
      if (!isInvalidNumber((shift.countTotal - shift.singlePeriodTarget) / shift.singlePeriodTarget))
        toGoal = Math.floor(((shift.countTotal - shift.singlePeriodTarget) / shift.singlePeriodTarget) * 100);

      toGoalValue = `(${
        toGoal < 0 ? toGoal + '%' : (toGoal == 0 ? toGoal : '+' + toGoal + '%')
        } of goal)`;
      toGoalCSSClassInfoBox = `chart-tooltip-item${
        toGoal < 0 ? ' is-danger' : (toGoal == 0 ? ' is-brand' : ' is-success')
        }`;

      return (
        <div className={toGoalCSSClassInfoBox} key={index}>
          <span>Shift {index + 1} <br /><span className="subtitle-shift">{toGoalValue}</span></span>
          {shift.countTotal === null ? <span>N.A.</span> :
            <span>
              {roundNumber(shift.countTotal, true).value}
              <span>{roundNumber(shift.countTotal, true).token}</span>
            </span>
          }
        </div>
      );
    }) : null;
    return (
      <div className="chart-tooltip">
        <div className="chart-tooltip-title">
          <h3 className="title is-6">
            {(isDay) ?
              value.timestamp + 'h' :
              ((isMonth && isWeekly) || (isCustomRange && isWeekly)) ?
                'CW ' + moment(value.timestamp).format('WW').toUpperCase() + ' - ' + moment(value.timestamp).format('DD/MM').toUpperCase() :
                moment(value.timestamp).format('dddd').toUpperCase() + ' - ' + moment(value.timestamp).format('DD/MM').toUpperCase()
            }
            {isIncomplete ? ' (Incomplete)' : ''}
          </h3>
        </div>
        {items}
      </div>
    );
  };

  let shifts = [];
  (shiftData && shiftData.length > 0) ? (shiftData).forEach((shift, index) => {
    shifts.push('shift' + index);
    legendKeys.push({ label: 'Shift ' + (index + 1) });
  }) : null;

  const RenderLegend = (props) => {
    const { payload, legendKeys } = props;
    return (
      <ul style={{ textAlign: 'center' }} className="chart-legend">
        {legendKeys.map((entry, index) => (
          <li key={`item-${index}`} className="chart-legend-item">
            <span className="chart-legend-icon" style={{ backgroundColor: colors.secondary[index] }} />
            {entry.label}
          </li>
        ))}
      </ul>
    );
  };

  const referenceLines = dataChart[0];

  return (
    <div className="axis-chart">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={dataChart} margin={{ top: 20, right: 40, left: 30, bottom: 20 }}>
          <CartesianGrid strokeDasharray="2 3" />
          <XAxis dataKey="timestamp" tick={<CustomizedXTick />} interval={dataChart.length < 10 ? 0 : 1} />
          <YAxis yAxisId="left" label={{ position: 'insideLeft' }} axisLine={false} tick={<CustomizedYTick />}
            interval={'preserveStartEnd'}
          />
          <Tooltip content={<CustomizedTooltip data={dataChart} />} />

          {shifts.map((shift, index) => (
            <Bar
              isAnimationActive={false}
              key={shift}
              yAxisId="left"
              dataKey={shift + '.countTotal'}
              fill={colors.secondary[index]}>
              {dataChart.map((entry, i) => {
                let incomplete = Object.keys(entry).some((k) => {
                  return entry[k]['incomplete'] || false;
                });

                if (incomplete) {
                  const rgba = convertHex(colors.secondary[index], 60);
                  return (
                    <Cell
                      key={`cell-${index}`}
                      stroke={colors.secondary[index]}
                      fill={rgba}
                      strokeWidth="3"
                      strokeDasharray="5 3"
                    />
                  );
                } else {
                  return <Cell key={`cell-${index}`} />;
                }
              })}
            </Bar>
          ))}

          <Legend content={<RenderLegend />} legendKeys={legendKeys} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

SinglePeriodChart.propTypes = {};

export default SinglePeriodChart;
