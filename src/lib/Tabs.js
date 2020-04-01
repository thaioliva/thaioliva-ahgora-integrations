import React from 'react';
import PropTypes from 'prop-types';

const Tabs = (props) => {

  const itemsPropTypes = {
    name: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  };

  const dataOrigin = props.items.map((item) => {
    PropTypes.checkPropTypes(itemsPropTypes, item, 'key', 'Tabs items prop');
    let CSSClass = `${(item.isActive || props.activeKey === item.key) ? ' is-active' : ''}`;
    CSSClass = `${CSSClass} ${(item.shift && props.activeSector === 'shift') ? ' is-invisible' : 'lo'}`;
    return (
      <li className={CSSClass} key={item.key}>
        <a onClick={props.onSelect.bind(null, item)}>
          {item.name}
        </a>
      </li>
    );
  });

  return (
    <div className="tabs is-toggle is-featured">
      <ul>
        {dataOrigin}
      </ul>
    </div>
  );

};

Tabs.defaultProps = {
  onSelect: () => { },
  activeKey: null
};

Tabs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func,
  activeKey: PropTypes.string
};

export default Tabs;
