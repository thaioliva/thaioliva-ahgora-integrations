import React from 'react';

import XTick from './components/XTick';
import YTick from './components/YTick';
import ChartLegend from './components/ChartLegend';
import ChartTooltip from './components/ChartTooltip';
import StaticTooltip from './components/StaticTooltip';

// Constants
import { colors } from 'core/constants';
// Utils
import { convertHex } from 'utils/utilsFn';

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
        console.log(shift.incomplete);
        if (shift.acumTotal !== null && !shift.incomplete) shift.acumTotal = shift.acumTotal * 1;
        item['line' + index] = shift;
      }) : null;
      // multilineChartData = (item.shifts || []).filter((k) => {
      //   if (k && k.incomplete) return k.acumTotal = null;
      //   return k;
      // });
      multilineChartData = item.shifts;
    }
    return item;
  });

  let mainLinesShifts = null;
  let mainLines = (
    <Line
      isAnimationActive={false}
      type="linear"
      dataKey="acumTotal"
      stroke="rgba(57, 159, 239, .6)"
      strokeWidth="4"
      dot={false}
      activeDot={activeDotStyle}
    />
  );

  if (props.isMultiline) {
    let lines = [];
    let linesIncomplete = [];
    (multilineChartData && multilineChartData.length > 0) ? (multilineChartData).forEach((shift, index) => {
      lines.push('line' + index);
    }) : null;
    (multilineChartData && multilineChartData.length > 0) ? (multilineChartData).forEach((shift, index) => {
      let incomplete = Object.keys(shift).some(() => shift && shift['incomplete'] || false);
      linesIncomplete.push('line' + index);
    }) : null;
    mainLines = lines.map((line, index) => (
      <Line
        key={line}
        isAnimationActive={false}
        type="linear"
        dataKey={line + '.acumTotal'}
        stroke={colors.secondary[index]}
        strokeWidth="4"
        dot={false}
        activeDot={{ stroke: 'white', fill: colors.secondary[index], strokeWidth: 3, r: 9 }}
      />
    ));

    mainLinesShifts = lines.map((line, index) => {
      const rgba = convertHex(colors.secondary[index], 60);
      return (
        <Line
          key={line}
          isAnimationActive={false}
          type="linear"
          dataKey={line + '.acumTotal'}
          stroke={rgba}
          strokeWidth="4"
          dot={false}
          activeDot={{ stroke: 'white', fill: colors.secondary[index], strokeWidth: 3, r: 9 }}
        />
      );
    }
    );
    // mainLinesShifts = chartData.map((entry, i) => {
    //   let incomplete = Object.keys(entry).some((k) => {
    //     //return entry[k] && entry[k]['line' + i] && entry[k]['line' + i]['incomplete'] || false;
    //     return entry[k] && entry[k]['incomplete'] || false;
    //   });
    //   //if (!incomplete) {
    //   return (
    //     <Line
    //       isAnimationActive={false}
    //       type="linear"
    //       key={i}
    //       dataKey="acumTotalComplete"
    //       stroke="rgba(57, 159, 239, .6)"
    //       strokeWidth="4"
    //       dot={false}
    //       activeDot={activeDotStyle}
    //     />
    //   );
    //   //}
    // }
    // );
  }

  const chartSettings = { top: 20, right: 40, left: 30, bottom: 20 };
  const activeDotStyle = { stroke: '#FFF', fill: colors.primary.blue, strokeWidth: 3, r: 9 };

  let tooltipCards = ['toGoalOnTotalProduction', 'scrapOnTotalProduction', 'totalProduction', 'periodProduction'];
  if (props.isMultiline) tooltipCards = ['shiftsOnTotalProduction'];

  return (
    <div className="axis-chart has-panel-overlaid">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={chartData} margin={chartSettings}>
          <CartesianGrid strokeDasharray="2 3" />

          <XAxis
            dataKey="timestamp"
            tick={<XTick hideFirstTick isMultiline={props.isMultiline} />}
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
                isMultiline={props.isMultiline}
              />
            )}
          />

          <Line
            isAnimationActive={false}
            type="linear"
            dataKey="linregress"
            stroke={colors.primary.grey}
            strokeDasharray="2 3"
            strokeWidth="2"
            dot={false}
            activeDot={false}
          />

          <Line
            isAnimationActive={false}
            type="linear"
            dataKey="target"
            stroke={colors.primary.green}
            strokeWidth="2"
            dot={false}
            activeDot={false}
          />

          {mainLines}
          {mainLinesShifts}

          {/* {chartData.map((entry, i) => {
            const rgba = convertHex(colors.secondary[1], 60);
console.log(entry.line0);
            // let incomplete = Object.keys(entry).some((k) => {
            //   //return entry[k] && entry[k]['line' + i] && entry[k]['line' + i]['incomplete'] || false;
            //   return entry[k] && entry[k]['incomplete'] || false;
            // });
            // if (!incomplete) {
            return (
              <Line
                isAnimationActive={false}
                type="linear"
                // eslint-disable-next-line react/no-array-index-key
                key={'line' + i}
                dataKey="acumTotalComplete"
                stroke={rgba}
                strokeWidth="4"
                dot={false}
                activeDot={activeDotStyle}
              />
            );
            // }
          }
          )} */}

          <Line
            isAnimationActive={false}
            type="linear"
            dataKey="acumTotalComplete"
            stroke={colors.primary.blue}
            strokeWidth="4"
            dot={false}
            activeDot={activeDotStyle}
          />

          <Legend
            content={<ChartLegend />}
            legendKeys={props.legendKeys}
          />

        </LineChart>
      </ResponsiveContainer>

      {!props.isMultiline ? <StaticTooltip chartData={chartData} /> : null}
    </div>
  );
};

Lines.defaultProps = {
  chartData: [],
  legendKeys: []
};

export default Lines;
