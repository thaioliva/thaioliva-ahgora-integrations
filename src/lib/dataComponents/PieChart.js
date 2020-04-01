import React from 'react';

import { fixNumber, prettyNumber } from 'utils/utilsFn';

import Grid from 'components/Grid';

import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const ScrapChart = (props) => {

  const chartData = props.chartData || [];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, fill }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    let textColor = 'white';

    if (fill === 'transparent') {
      textColor = 'transparent';
    }

    return (
      <text
        x={x}
        y={y}
        fill={textColor}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central">
        {`${fixNumber(percent * 100, 0)}%`}
      </text>
    );
  };

  const CustomizedTooltip = (props) => {
    if (!props.active) return null;
    return (
      <div className="chart-tooltip">
        <div className="chart-tooltip-item">
          <span className="tooltip-value">
            {props.payload[0].payload.tooltipValue || prettyNumber(props.payload[0].value, 2, 'pt-BR').formatted}
          </span>
        </div>
      </div>
    );
  };

  const classGraphs = `circle-chart ${(props.oee) ? 'oeeGraph' : ''}`;
  return (
    <React.Fragment>

      <Grid>
        <Grid.Col className="is-hidden-touch">
          <div className="v-space-small" />
          <h3 className="title is-6 is-uppercase">
            {props.title}
          </h3>
        </Grid.Col>
      </Grid>

      <ResponsiveContainer width="100%" height={500} className={classGraphs}>
        <PieChart>
          {props.oee ? ''
            : <Tooltip content={<CustomizedTooltip data={chartData} />} />
          }
          <Legend iconType="circle" />
          {props.oee
            ? <Pie
                isAnimationActive={false}
                data={chartData}
                dataKey="value"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={200}
                startAngle={180} 
                endAngle={-360}>
                {chartData.map((entry, index) => {
                  return <Cell fill={entry.color} key={index} />
                })
                }
              </Pie>
            : <Pie
                isAnimationActive={false}
                data={chartData}
                dataKey="value"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={200}>
                {chartData.map((entry, index) => {
                  return <Cell fill={entry.color} key={index} />
                })
                }
              </Pie>
          }

        </PieChart>
      </ResponsiveContainer>

    </React.Fragment>
  );
};

ScrapChart.propTypes = {};

export default ScrapChart;
