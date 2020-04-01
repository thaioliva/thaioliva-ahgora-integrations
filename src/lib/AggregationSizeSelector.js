import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'components/Grid';

import RouterUtils from 'utils/RouterUtils';

const AggregationSizeSelector = (props) => {

  if (RouterUtils.constant('isWeek') || RouterUtils.constant('isDay')) return null;

  return (
    <Grid.Col right>
      <div className="control is-boxed">

        {!RouterUtils.constant('isMonth') ?
          <label className="radio" htmlFor="byMonth">
            <input
              type="radio"
              id="byMonth"
              defaultChecked={props.current === 'month'}
              name="aggregationSize"
              value="month"
              onChange={props.onChange}
            />
            <div className="radio-token"><span /></div>
            <span className="radio-label">Monthly</span>
          </label>
          : null
        }

        <label className="radio" htmlFor="byWeek">
          <input
            type="radio"
            id="byWeek"
            defaultChecked={props.current === 'week'}
            name="aggregationSize"
            value="week"
            onChange={props.onChange}
          />
          <div className="radio-token"><span /></div>
          <span className="radio-label">Weekly</span>
        </label>

        <label className="radio" htmlFor="byDay">
          <input
            type="radio"
            id="byDay"
            defaultChecked={props.current === 'day'}
            name="aggregationSize"
            value="day"
            onChange={props.onChange}
          />
          <div className="radio-token"><span /></div>
          <span className="radio-label">Daily</span>
        </label>

      </div>
    </Grid.Col>
  );
};

AggregationSizeSelector.defaultProps = {
  onChange: () => {}
};

AggregationSizeSelector.propTypes = {
  onChange: PropTypes.func
};

export default AggregationSizeSelector;
