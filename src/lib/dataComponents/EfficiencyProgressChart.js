import React from 'react';

import XTick from './components/XTick';
import YTick from './components/YTick';
import ChartLegend from './components/ChartLegend';
import ChartTooltip from './components/ChartTooltip';
import StaticTooltip from './components/StaticTooltip';

import { colors } from 'core/constants';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const Lines = (props) => {

  // Create new array to avoid affect the original
  let chartData = props.chartData.concat();
  let multilineChartData = [];
  // Apply a new value in all items without the "incomplete" flag
  chartData = chartData.map((item) => {
    if (!item.incomplete) item.acumTotalComplete = item.acumTotal;
    if (props.isMultiline) {
      item.shifts ? item.shifts.forEach((shift, index) => {
        if (shift.acumTotal !== null) shift.acumTotal = shift.acumTotal * 1;
        item['line' + index] = shift;
      }) : null;
      multilineChartData = item.shifts;
    }
    return item;
  });

  let mainLines = (
    <Line
      isAnimationActive={false}
      type="linear"
      dataKey="efficiency"
      stroke="rgba(57, 159, 239, .6)"
      strokeWidth="4"
      dot={false}
      activeDot={activeDotStyle}
    />
  );

  if (props.isMultiline) {
    let lines = [];
    (multilineChartData && multilineChartData.length > 0) ? (multilineChartData).forEach((shift, index) => {
      lines.push('line' + index);
    }) : null;
    
    mainLines = lines.map((line, index) => (
      <Line
        key={line}
        isAnimationActive={false}
        type="linear"
        dataKey={line + '.efficiency'}
        stroke={colors.secondary[index]}
        strokeWidth="4"
        dot={false}
        activeDot={{ stroke: 'white', fill: colors.secondary[index], strokeWidth: 3, r: 9 }}
      />
    ));
  }

  const chartSettings = { top: 20, right: 40, left: 30, bottom: 20 };
  const activeDotStyle = { stroke: '#FFF', fill: colors.primary.blue, strokeWidth: 3, r: 9 };
  let tooltipCards = ['efficiencyOnTotalProduction'];
  if (props.isMultiline) tooltipCards = ['efficiencyShiftsOnTotalProduction'];
  return (
    <div className="axis-chart has-panel-overlaid">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={chartData} margin={chartSettings}>
          <CartesianGrid strokeDasharray="2 3" />

          <XAxis
            dataKey="timestamp"
            tick={<XTick hideFirstTick />}
            interval={chartData.length < 10 ? 0 : 1}
          />

          <YAxis
            label={{ position: 'insideLeft' }}
            tick={<YTick />}
            interval={'preserveStartEnd'}
          />

          <Tooltip
            content={(
              <ChartTooltip
                chartData={chartData}
                cards={tooltipCards}
              />
            )}
          />

          {mainLines}

          <Legend
            content={<ChartLegend />}
            legendKeys={props.legendKeys}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

Lines.defaultProps = {
  chartData: [],
  legendKeys: []
};

export default Lines;
