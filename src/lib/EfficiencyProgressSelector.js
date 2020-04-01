import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'components/Grid';


const EfficiencyProgressSelector = (props) => {

  return (
    <Grid.Col right>
      <div className="control is-boxed">

        <label className="radio" htmlFor="On">
          <input
            type="radio"
            id="On"
            defaultChecked={props.current === true}
            name="otherGraphs"
            value="true"
            onChange={props.onChange}
          />
          <div className="radio-token"><span /></div>
          <span className="radio-label">Show</span>
        </label>

        <label className="radio" htmlFor="off">
          <input
            type="radio"
            id="off"
            defaultChecked={props.current === false}
            name="otherGraphs"
            value="false"
            onChange={props.onChange}
          />
          <div className="radio-token"><span /></div>
          <span className="radio-label">Hide</span>
        </label>

      </div>
    </Grid.Col>
  );
};

EfficiencyProgressSelector.defaultProps = {
  onChange: () => {}
};

EfficiencyProgressSelector.propTypes = {
  onChange: PropTypes.func
};

export default EfficiencyProgressSelector;
