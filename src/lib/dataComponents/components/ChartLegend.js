import React from 'react';

const ChartLegend = (props) => {
  const { legendKeys } = props;
  return (
    <ul style={{ textAlign: 'center' }} className="chart-legend">
      {legendKeys.map((entry, index) => (
        <li key={index} className="chart-legend-item">
          <span className="chart-legend-icon" style={{ backgroundColor: entry.color }} />
          {entry.label}
        </li>
      ))}
    </ul>
  );
};

export default ChartLegend;
