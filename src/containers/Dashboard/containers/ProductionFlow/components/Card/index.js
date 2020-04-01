import React from 'react';
import PropTypes from 'prop-types';
import CardWraper from './CardWraper';

import { roundNumber } from 'utils/utils';
import { prettyNumber } from 'utils/utilsFn';
const Tooltip = () => (
  <div className="tooltip top-right">
    <i className="fas fa-exclamation-triangle" />
    <div className="tooltip-content">
      <p className="text">
        Zero Production
      </p>
      <p className="text is-small is-light">
        Please make sure the sensors are working or if this line were used up to this machine.
      </p>
    </div>
  </div>
);

const Card = (props) => (
  <div className="funnel-card">
    <div className="funnel-card-header">
      <div className="funnel-card-wrapper is-featured">
        <h3 className="title is-label">{props.Function}</h3>
      </div>
      <CardWraper label={'Current Speed'}
        cssContainer={''}
        cssChild={'is-dark'} value={parseFloat(props.Speed).toFixed(2).replace('.', ',') + ' pc/min'}
      />
    </div>
    <div className="funnel-card-body">
      <span className="funnel-chart" style={props.cssFlow} />
      <div className="funnel-overlaid-info">
        <CardWraper label={'Scrap'}
          cssContainer={'funnel-overlaid-info-wrapper'}
          cssChild={'is-danger'} value={parseFloat(props.scrap).toFixed(2).replace('.', ',') + ' %'}
        />
      </div>
      {(props.tooltip)
        ? Tooltip
        : ''
      }
    </div>
    <div className="funnel-card-footer">
      <CardWraper label={'Production'}
        cssContainer={''}
        cssChild={'is-brand'} value={roundNumber(props.totalProduction)}
      />
      <CardWraper label={'Scrap'}
        cssContainer={''}
        cssChild={'is-danger'} value={roundNumber(props.scrap_units)}
      />
    </div>
  </div>
);

Card.defaultProps = {
  totalProduction: [],
  tooltip: null,
  cssFlow: {},
  scrap: '0',
  Speed: 0,
  Function: ''
};

Card.propTypes = {
  totalProduction: PropTypes.string,
  tooltip: PropTypes.any,
  cssFlow: PropTypes.object,
  Speed: PropTypes.number,
  Function: PropTypes.string
};

export default Card;
