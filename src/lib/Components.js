import React from 'react';
import PropTypes from 'prop-types';

const Components = (props) => {

  const itemsPropTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

  const items = props.items.map((item) => {
    PropTypes.checkPropTypes(itemsPropTypes, item, 'key', 'Components items prop');
    const CSSClass = `${item.isActive || props.activeKey === item.id ? ' is-active' : ''}`;
    return (
      <li className={CSSClass} key={item.id}>
        <button onClick={props.onSelect.bind(null, item)}>
          {item.name}
        </button>
      </li>
    );
  });

  return (
    <div className="tabs">
      <ul>{items}</ul>
      {props.children}
    </div>
  );

};

Components.defaultProps = {
  onSelect: () => {},
  children: null,
  activeKey: null
};

Components.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func,
  children: PropTypes.any,
  activeKey: PropTypes.string
};

export default Components;
