import React from 'react';
import PropTypes from 'prop-types';

import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';

import moment from 'moment';
moment.locale('pt-BR', { longDateFormat: { L: 'YYYY-MM-DD' } });

const START_DATE = 'startDate';
const END_DATE = 'endDate';

class DatePicker extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      focusedInput: START_DATE,
      startDate: moment(),
      endDate: moment()
    };
  }

  componentWillReceiveProps(nextProps) {
    const startDate = moment(nextProps.selectedStartDate);
    const endDate = moment(nextProps.selectedEndDate);
    this.setState({
      startDate: startDate._isValid ? startDate : moment(),
      endDate: endDate._isValid ? endDate : moment()
    });
  }

  render() {

    const defaultProps = {
      minimumNights: 0,
      isDayBlocked: () => false,
      isDayHighlighted: () => false,
      enableOutsideDays: false,
      numberOfMonths: 2
    };

    const { selectedStartDate, selectedEndDate } = this.props;

    return (
      <div className="datepicker">
        <DayPickerRangeController
          startDate={this.state.startDate || selectedStartDate}
          endDate={this.state.endDate || selectedEndDate}
          onDatesChange={this.handleChange.bind(this)}
          hideKeyboardShortcutsPanel={true}
          isOutsideRange={(momentDate) => moment(momentDate).isAfter(moment().add(1, 'day'))}
          focusedInput={this.state.focusedInput}
          onFocusChange={this.onFocusChange.bind(this)}
          {...defaultProps}
        />
      </div>
    );
  }

  onFocusChange() {
    this.setState({ focusedInput: this.state.focusedInput === END_DATE ? START_DATE : END_DATE });
  }

  handleChange({ startDate, endDate }) {
    startDate = startDate || moment();
    endDate = endDate || moment();
    this.setState({ startDate, endDate });
    this.props.onSelectDate(startDate, endDate);
  }

}

const momentPropType = (props, propName, componentName) => {
  if (!moment(props[propName])._isValid) {
    return new Error(
      'Invalid prop `' + propName + '` supplied to' +
      ' `' + componentName + '`. Validation failed. Expecting a valid date for momentjs'
    );
  }
};

DatePicker.defaultProps = {
  selectedStartDate: moment(),
  selectedEndDate: moment()
};

DatePicker.propTypes = {
  selectedStartDate: momentPropType,
  selectedEndDate: momentPropType,
  onSelectDate: PropTypes.func.isRequired
};

export default DatePicker;
