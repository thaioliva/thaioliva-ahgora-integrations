import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import Icon from 'components/Icon';

const ViewSelector = (props) => {

  const views = [{
    name: 'Details',
    key: 'details',
    homeTab: 'production'
  }, {
    name: 'Dashboard',
    key: 'dashboard',
    homeTab: 'total-production'
  }].map((item) => {
    const CSSClass = `button is-rounded${props.activeKey === item.key ? ' is-active' : ''}`;
    return (
      <div className="control" key={item.key}>
        <button className={CSSClass} onClick={props.onSelect.bind(null, item)}>
          {item.name}
        </button>
      </div>
    );
  });

  return (
    <div className="view-selector">
      <span className="button-label"> View:</span>
      <div className="field has-addons">
        {views}
        <div className="control">
          <Button theme="rounded" onClick={props.onRefresh}>
            <Icon name="sync" />
          </Button>
        </div>
      </div>
    </div>
  );

};

ViewSelector.defaultProps = {
  onRefresh: () => {},
  onSelect: () => {}
};

ViewSelector.propTypes = {
  onRefresh: PropTypes.func,
  onSelect: PropTypes.func
};

export default ViewSelector;
