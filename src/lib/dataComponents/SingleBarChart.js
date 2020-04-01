import React from 'react';

import XTick from './components/XTick';
import YTick from './components/YTick';
import ChartLegend from './components/ChartLegend';
import ChartTooltip from './components/ChartTooltip';

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

// Utils
import { convertHex } from 'utils/utilsFn';

const SinglePeriodChart = (props) => {

  // Create new array to use shift() without affecting the original
  let chartData = props.chartData.concat();

  // Remove the first item of chartData related to the last day of the previous month/week/day
  chartData.shift();

  // Remove all items with countTotal value equal to null
  chartData = chartData.filter((item) => item.countTotal !== null);

  const chartSettings = { top: 20, right: 40, left: 30, bottom: 20 };

  // Set min/max values to 100 for percentage charts
  const yAxisDomain = [(dataMin) => {
    let min = Math.floor(dataMin / 10) * 10;
    if (min < -100) min = -100;
    return min < 0 ? (0 + min) : (0 - min);
  }, (dataMax) => {
    let max = Math.round(dataMax / 10) * 10;
    if (dataMax > max) max = Math.ceil(dataMax / 10) * 10;
    if (max > 100) max = 100;
    return max;
  }];

  const rgba = convertHex(props.color, 60);

  return (
    <div className="axis-chart">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={chartData} margin={chartSettings}>
          <CartesianGrid strokeDasharray="2 3" />

          <XAxis
            dataKey="timestamp"
            tick={<XTick />}
            interval={chartData.length < 10 ? 0 : 1}
          />

          <YAxis
            yAxisId={props.dataKey}
            label={{ position: 'insideLeft' }}
            tick={<YTick isPercentage={props.isPercentage} />}
            interval={'preserveStartEnd'}
            domain={props.isPercentage ? yAxisDomain : ['auto']}
          />

          <Tooltip
            content={(
              <ChartTooltip
                chartData={chartData}
                cards={props.tooltipCards}
              />
            )}
          />

          <Bar
            isAnimationActive={false}
            yAxisId={props.dataKey}
            dataKey={props.dataKey}
            fill={props.color}>
            {chartData.map((entry, index) => {
              if (entry.incomplete) {
                return (
                  <Cell
                    key={`cell-${index}`}
                    stroke={props.color}
                    fill={rgba}
                    strokeWidth="3"
                    strokeDasharray="5 3"
                  />
                );
              } else {
                return (<Cell key={`cell-${index}`} />);
              }
            })}
          </Bar>

          <ReferenceLine
            yAxisId={props.dataKey}
            alwaysShow={true}
            isFront={false}
            y={0}
            strokeWidth="1"
            stroke={props.color}
          />

          {props.referenceLines.map((line) => (line.y ? (
            <ReferenceLine
              key={line.y}
              yAxisId={props.dataKey}
              alwaysShow={true}
              isFront={true}
              y={line.y}
              strokeWidth="2"
              strokeDasharray={line.strokeDasharray}
              stroke={line.stroke}
            />
          ) : null))}

          <Legend
            content={<ChartLegend />}
            legendKeys={props.legendKeys}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SinglePeriodChart;
