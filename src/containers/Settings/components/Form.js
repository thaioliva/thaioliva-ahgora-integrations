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
        <Form onSubmit={this.save.bind(this)}>
          <Grid>
            <Grid.Col>
              <label className="dropdown-label">Lines</label>
              <Dropdown isField trigger={<React.Fragment><span>{this.state.lineSelected}</span> <Icon name="angle-down" /></React.Fragment>}>
                {dataDropdownLines}
              </Dropdown>
            </Grid.Col>
            <Grid.Col>
              <label className="dropdown-label">Goal Period</label>
              <Dropdown isField trigger={<React.Fragment><span>{this.state.goalSelected}</span> <Icon name="angle-down" /></React.Fragment>}>
                {dataDropdownGoalPeriod}
              </Dropdown>
            </Grid.Col>
            <Grid.Col>
              <Field label="Goal (Integer only)">
                <Input placeholder="--" onChange={this.handleChange.bind(this, 'value')} />
              </Field>
            </Grid.Col>
            <Grid.Col className="has-content-size align-bottom">
              <Button className="is-square" onClick={this.save.bind(this)}>Update Goal</Button>
            </Grid.Col>
          </Grid>
        </Form>
        <Grid>
          <Grid.Col>
            <span className="title is-6 is-dark">{this.state.message}</span>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col>
            <div className="v-space-small" />
            <h3 className="title is-6 is-uppercase">
              Goals
            </h3>
            <hr className="hr is-small"/>
          </Grid.Col>
        </Grid>

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
