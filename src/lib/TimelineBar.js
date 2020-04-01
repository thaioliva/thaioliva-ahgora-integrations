import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import { roundNumber, percent } from 'utils/utils';
import { convertToDaysHours } from 'utils/utilsFn';

const TimelineBar = (props) => {

  let sum = 0;
  let newData = [];

  (props.data || []).forEach((item) => sum += item.total);

  if ((props.data || []).length > 4) {
    (props.data || []).forEach((item, index) => {
      if (index < 4) {
        newData[index] = item;
      } else {
        newData[4] = !newData[4] ? {} : newData[4];
        newData[4].name = 'Others';
        newData[4].total = !newData[4].total ? 0 : newData[4].total;
        newData[4].total += (item.total * 1);
      }
    });
  } else {
    newData = (props.data || []);
  }

  const colors = ['#D678F7', '#7CEC87', '#F3AC76', '#63ADF5', '#BCBFC5'];
  let dataPercent = '';
  let dataTotal = 0;
  let originalPercent = 0;

  const items = (newData || []).map((item, index) => {
    if (item.total > 0) {
      dataPercent = percent(sum, item.total, 1);
      originalPercent = dataPercent;
      originalPercent = originalPercent.toString().replace(',', '.');

      if (props.format === 'hours') {
        dataTotal = convertToDaysHours(item.total, 'seconds');
      } else if (props.format === 'seconds') dataTotal = dataTotal + ' sec';
      else dataTotal = roundNumber(item.total, 0, 1);

      const tooltipText = (item.name || 'no name') + ' - ' + dataTotal;
      return (
        <div className="timeline-bar-item" style={{ width: originalPercent + '%' }} key={index}>
          <ReactTooltip className="timeline-tooltip" place="top" type="dark" effect="float" />
          <div className="timeline-bar-content" data-tip={tooltipText}>
            <div className="timeline-bar-title">{item.name || 'no name'}</div>
            <div className="timeline-bar-value" title={dataPercent + '% - ' + dataTotal}>
              {dataPercent}%
            </div>
          </div>
          <div className="timeline-bar-progress" style={{ backgroundColor: colors[index] }} />
        </div>
      );
    }
  });

  return (
    <div className="timeline-bar is-hidden-touch">
      {items}
    </div>
  );
};

TimelineBar.defaultProps = {
  data: [],
  format: ''
};

TimelineBar.propTypes = {
  data: PropTypes.array,
  format: PropTypes.string
};

export default TimelineBar;
