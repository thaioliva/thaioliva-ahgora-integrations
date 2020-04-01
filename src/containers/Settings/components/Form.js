import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import * as actions from '../actions';

import Grid from 'components/Grid';
import DataTable from 'lib/DataTable';
import Field from 'components/Field';
import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import Form from 'components/Form';
import Button from 'components/Button';
import Icon from 'components/Icon';

export class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      currentItem: {
        lineName: null,
        period: null,
        value: null
      },
      lineSelected: '--',
      goalSelected: '--'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSuccess !== this.props.isSuccess && nextProps.isSuccess !== null) {
      this.setState({ message: nextProps.isSuccess ? 'Values updated.' : 'Sorry, an error ocurred. Please try again.' });
      setTimeout(() => {
        this.setState({ message: '' });
      }, 1300);
    }
  }

  render() {

    return (
      <React.Fragment>
        teste

      </React.Fragment>
    );
  }

  handleChange(type, field, callback) {
    const fieldValue = typeof field === 'string' ? field : field.target.value;
    let items = this.state.currentItem;
    let value = fieldValue || null;
    items[type] = value;
    if (type === 'value' && !!parseInt(fieldValue)) {
      items[type] = parseInt(value);
    } else if (type === 'value' && !!!parseInt(fieldValue)) {
      this.setState({ message: 'Please, inform a integer value to Goal field.' });
      return;
    }
    this.setState({
      currentItem: items,
      message: ''
    });
    if (callback) callback();
  }

  save() {
    if (this.checkCurrent.bind(this)()) {
      this.props.saveTarget(this.state.currentItem);
    } else {
      this.setState({ message: 'Hello, configure all fields to save a Goal.' });
    }
  }

  checkCurrent() {
    const isValid = (
      !this.state.currentItem.lineName ||
      !this.state.currentItem.period ||
      !this.state.currentItem.value
    );
    return !isValid;
  }

}

Form.propTypes = {};

export default connect((store) => ({
  isSuccess: store.Settings.saveIsSuccess
}), actions)(Form);
