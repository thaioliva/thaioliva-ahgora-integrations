import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';

export default class DropdownIcon extends React.Component {

  constructor() {
    super();
    this.state = {
      isActive: false
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), true);
  }

  toggleDropdown() {
    this.setState({ isActive: !this.state.isActive });
  }

  closeDropdown() {
    if (this.state.isActive) this.setState({ isActive: false });
  }

  handleClickOutside(event) {
    const container = this.container;
    if (container && !container.contains(event.target)) this.closeDropdown();
  }

  render() {
    const { trigger, children } = this.props;
    const dropdownCSSClass = `dropdown${
      this.state.isActive ? ' is-active' : ''
    }${
      this.props.className ? ' ' + this.props.className : ''
    }`;
    return (
      <React.Fragment>
        <label className="dropdown-label">{this.props.labelTitle}</label>
        <div className={dropdownCSSClass} ref={element => this.container = element}>
          <div className="dropdown-trigger is-field" onClick={this.toggleDropdown.bind(this)}>
            {trigger}
            <i className="fas fa-caret-down"></i>
          </div>
          <div className="dropdown-menu" role="menu">
            <div className="dropdown-content" onClick={this.toggleDropdown.bind(this)}>
              {children}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

};

DropdownIcon.propTypes = {};
