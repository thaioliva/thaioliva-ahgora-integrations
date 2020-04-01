import React from 'react';

import { roundNumber, percent } from 'utils/utils';

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import RouterUtils from 'utils/RouterUtils';


import moment from 'moment';

// Constants
import { colors } from 'core/constants';

const ScrapChart = (props) => {

  let data = (props.productionData || []).concat();
  let legendKeys = [];
  let shiftData = [];

  data = data.map((item, index) => {
    item.shifts ? item.shifts.forEach((shift, index) => {
      shift.scrapCalculated = percent((shift.scrap / (shift.countTotal + shift.scrap)) * 100);
      shift.scrapCalculated = shift.scrapCalculated.replace(',', '.');
      shift.scrapCalculated = shift.scrapCalculated * 1;

      shiftData = item.shifts;
      item['shift' + index] = shift;
    }) : null;

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
    if (isMonth && isWeekly  || (isCustomRange && isWeekly)) {
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
    return (
      <text x={props.x} y={props.y}>
        <tspan x={(props.x)} dy="4" textAnchor="end">
          {roundNumber(props.payload.value) > 100 ? 100 : roundNumber(props.payload.value)}%
        </tspan>
      </text>
    );
  };

  const CustomizedTooltip = (props) => {
    if (!props.data) return null;
    let value = props.data.filter((item) => item.timestamp === props.label);
    value = value[0] || {};

    let items = null;
      items = value.shifts ? value.shifts.map((shift, index) => {
        let i = index + 1;
        value['shift' + i] = shift;
        return (
          <div className="chart-tooltip-item is-danger" key={index}>
            <span>Shift {i}</span>
            {shift.scrapCalculated === null ? <span>N.A.</span> :
              <span className="hasnoicon">
                {shift.scrapCalculated || 'N.A.'}
                <span>%</span>
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
                'CW ' + moment(value.timestamp).format('WW').toUpperCase() + '  ' + moment(value.timestamp).format('DD/MM').toUpperCase() :
                moment(value.timestamp).format('dddd').toUpperCase() + '  ' + moment(value.timestamp).format('DD/MM').toUpperCase()
            }
            {value.incomplete ? ' (Incomplete)' : ''}
          </h3>
        </div>
        {items}
      </div>
    );
  };

  let shifts = [];
  (shiftData && shiftData.length > 0) ? (shiftData).forEach((shift, index) => {
    shifts.push('shift' + index);
    let i = index + 1;
    legendKeys.push({ label: 'Shift ' + i });
  }) : null;
  
  const RenderLegend = (props) => {
    const { legendKeys } = props;
    return (
      <ul style={{ textAlign: 'center' }} className="chart-legend">
        {legendKeys.map((entry, index) => (
          <li key={`item${index}`} className="chart-legend-item">
            <span className="chart-legend-icon" style={{ backgroundColor: colors.secondary[index] }}></span>
            {entry.label}
          </li>
        ))}
      </ul>
    );
  };

  const referenceLines = dataChart[0];

  return (
    <div className="axischart">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={dataChart} margin={{ top: 20, right: 40, left: 30, bottom: 20 }}>
          <CartesianGrid strokeDasharray="2 3" />
          <XAxis dataKey="timestamp" tick={<CustomizedXTick />} interval={dataChart.length < 10 ? 0 : 1} />
          <YAxis yAxisId="left" label={{ position: 'insideLeft' }} tick={<CustomizedYTick />} interval={'preserveStartEnd'} />
          <Tooltip content={<CustomizedTooltip data={dataChart} />} />

          {shifts.map((shift, index) => (
            <Bar
              isAnimationActive={false}
              key={shift}
              yAxisId="left"
              dataKey={shift + '.scrapCalculated'}
              fill={colors.secondary[index]}>
              {dataChart.map((index) => {
                return <Cell key={`cell${index}`} />;
              })}
            </Bar>
          ))}

          <ReferenceLine yAxisId="left" alwaysShow={true} isFront={true} y={0} strokeWidth="1" stroke="#ED7671" />
          <ReferenceLine yAxisId="left" alwaysShow={true} isFront={true} y={referenceLines ? (referenceLines.scrapAverage/(referenceLines.scrapAverage+referenceLines.singlePeriodAverage))*100 : null} strokeWidth="2" strokeDasharray="2 3" stroke="#888F9D" />
          <Legend content={<RenderLegend />} legendKeys={legendKeys} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

ScrapChart.propTypes = {};

export default ScrapChart;