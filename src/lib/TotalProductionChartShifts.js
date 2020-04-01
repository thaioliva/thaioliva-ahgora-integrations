import React from 'react';
import PropTypes from 'prop-types';

import { roundNumber, percent, isMobile } from 'utils/utils';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  Legend,
  Area,
  Brush,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Sector,
  Cell,
  LabelList
} from 'recharts';

import RouterUtils from 'utils/RouterUtils';

import moment from 'moment';

const TotalProductionChartShifts = (props) => {

  let data = props.productionData || [];
  let dataIncomplete = null;
  let toGoalBoxValue, toGoalBoxToken = null;
  let projectedBoxValue, projectedBoxToken, toGoalCSSClassInfoBox = null;
  let toGoalBox = null;
  let projectedBoxToGoal = null;
  let legendKeys = [];
  let shiftData = [];

  data = data.map((item, index) => {
    if (item.linregress < 0) {
      item.linregress = null;
    }
    if (item.hasOwnProperty('incomplete')) {
      dataIncomplete = index;
      item.acumTotalIncomplete = null;
    } else {
      item.acumTotalIncomplete = item.acumTotal;
    }
    if (dataIncomplete > index) item.acumTotalIncomplete = null;

    item.shifts ? item.shifts.forEach((shift, i) => {
      console.log(index, shift, i);
      item['shift' + i] = shift;
    }) : null;

    shiftData.push(item.shifts);

    return item;
  });

  const isDay = props.match.params.timeRange === 'day';
  const isMonth = props.match.params.timeRange === 'month';
  const isWeek = props.match.params.timeRange === 'week';
  const isWeekly = props.match.params.aggregationSize === 'by-week';

  const isCustomRange = RouterUtils.constant('isCustomRange');

  const CustomizedXTick = (props) => {
    if (isDay) {
      let h = (props.payload.value < 10) ? '0' + props.payload.value : props.payload.value;
      return (
        <text x={props.x} y={props.y}>
          <tspan x={props.x} dy="15" textAnchor="middle" fill="#666">
            {moment(h + ':00', 'HH:mm').format('HH')}h
          </tspan>
        </text>
      );
    }
    if ((isMonth && isWeekly) || (isCustomRange && isWeekly)) {
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

  const CustomizedYTick = (props) => { 
    // console.log(props);
    return(
    <text x={props.x} y={props.y}>
      <tspan x={(props.x)} dy="4" textAnchor="end">
        {roundNumber(props.payload.value)}
      </tspan>
    </text>
  )};

  const CustomizedTooltip = (props) => {
    if (!props.data) return null;

    let value = props.data.filter((item) => item.timestamp === props.label);
    value = value[0] || {};

    const toGoal = Math.floor(((value.acumTotal - value.target) / value.target) * 100);

    const toGoalCSSClass = `chart-tooltip-item${
      toGoal < 0 ? ' is-danger' : (toGoal == 0 ? ' is-brand' : ' is-success')
    }`;
    let h = '';
    h = (isDay && value.timestamp < 10) ? '0' + value.timestamp : value.timestamp;
    
    let items = null;
    items = value.shifts ? value.shifts.map((shift, index) => {
      value['shift' + index] = shift;
      return (
        <div className="chart-tooltip-item" key={index}>
          <span>Shift {index}</span>
          {shift.acumTotal === null ? <span>N.A.</span> :
            <span>
              {roundNumber(shift.acumTotal, true).value}
              <span>{roundNumber(shift.acumTotal, true).token}</span>
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
              moment(h + ':00', 'HH:mm').format('HH'):
              ((isMonth && isWeekly) || (isCustomRange && isWeekly)) ?
                'CW ' + moment(value.timestamp).format('WW').toUpperCase() + ' - ' + moment(value.timestamp).format('DD/MM').toUpperCase() :
                moment(value.timestamp).format('dddd').toUpperCase() + ' - ' + moment(value.timestamp).format('DD/MM').toUpperCase()
            }
            {value.incomplete ? ' (Incomplete)' : ''}
          </h3>
        </div>
        {toGoal ?
          <div className={toGoalCSSClass}>
            <span>To Goal</span>
            <span>
              {percent(toGoal)}
              <span>%</span>
            </span>
          </div>
          : null}
        {items}
      </div>
    );
  };

  const CustomizedDot = (props) => {
    const toGoal = Math.floor(((props.payload.linregress - props.payload.target) / props.payload.target) * 100);
    const toGoalValue = ` (${
      toGoal < 0 ? toGoal + '%' : (toGoal == 0 ? toGoal : '+' + toGoal + '%')
    } of goal)`;
    toGoalCSSClassInfoBox = `chart-tooltip-item${
      toGoal < 0 ? ' is-danger' : (toGoal == 0 ? ' is-brand' : ' is-success')
    }`;
    toGoalBoxValue = (props.payload.target) ? roundNumber(props.payload.target, true).value : 0;
    toGoalBoxToken = (props.payload.target) ? roundNumber(props.payload.target, true).token : 0;

    projectedBoxValue = (props.payload.linregress) ? roundNumber(props.payload.linregress, true).value : 0;
    projectedBoxToken = (props.payload.linregress) ? roundNumber(props.payload.linregress, true).token : 0;
    projectedBoxToGoal = toGoalValue;
    if (props.index === data.length - 1) {
      return (
        // Não remover esse retorno, depois sera refatorado
        null
      );
    }
    return null;
  };

  let shifts = [];
  (shiftData && shiftData.length > 0) ? (shiftData).forEach((shift, index) => {
    shifts.push('shift' + index);
    console.log(shift);
    legendKeys.push({ label: 'Shift ' + index });
  }) : null;

  const colors = ['#7CEC87', '#F3AC76', '#63ADF5', '#BCBFC5'];

  const RenderLegend = (props) => {
    const { payload, legendKeys } = props;
    return (
      <ul style={{ textAlign: 'center' }} className="chart-legend">
        {legendKeys.map((entry, index) => (
          <li key={`item-${index}`} className="chart-legend-item">
            <span className="chart-legend-icon" style={{ backgroundColor: entry.color || colors[index] }} />
            {entry.label}
          </li>
        ))}
      </ul>
    );
  };
  legendKeys.push({ label: 'Trend Line', color: '#888F9D' });

  if (!isCustomRange) legendKeys.push({ label: 'Production Goal', color: '#55CF9C' });

  let chartSettings = { top: 20, right: 40, left: 30, bottom: 20 };
  let tooltip = <Tooltip active={true} content={<CustomizedTooltip data={data} />} />;

  if (isMobile.any()) {
    chartSettings = { top: 20, right: 0, left: 0, bottom: 20 };
  }
  let d = [];
  if (data.length > 0) {
    d = data;
  }
  return (
    <div className="axis-chart">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data} margin={chartSettings}>
          <CartesianGrid strokeDasharray="2 3" />
          <XAxis allowDuplicatedCategory={false} dataKey="timestamp" tick={<CustomizedXTick />} interval={data.length < 10 ? 0 : 1} />
          <YAxis label={{ position: 'insideLeft' }} tick={<CustomizedYTick />} interval={'preserveStartEnd'} />
          {tooltip}

          <Line
            isAnimationActive={false}
            type="linear"
            dataKey="shift0.linregress"
            stroke="#888F9D"
            strokeDasharray="2 3"
            strokeWidth="2"
            dot={false}
            activeDot={false}
          />
          <Line
            isAnimationActive={false}
            type="linear"
            dataKey="shift0.target"
            stroke="#55CF9C"
            strokeWidth="2"
            dot={<CustomizedDot />}
            activeDot={false}
          />
          {data.map((shift, index) => {
            return (
              <Line
                key={shift}
                isAnimationActive={false}
                type="linear"
                dataKey={shift[index] + '.acumTotal'}
                stroke={colors[index]}
                strokeWidth="4"
                dot={false}
                activeDot={{ stroke: 'white', fill: colors[index], strokeWidth: 3, r: 9 }}
              />
            );
          })}

          <Legend content={<RenderLegend />} legendKeys={legendKeys} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

TotalProductionChartShifts.propTypes = {};

export default TotalProductionChartShifts;