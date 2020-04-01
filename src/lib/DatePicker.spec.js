import React from 'react';
import { mount } from 'enzyme';
import DatePicker from './DatePicker';
import moment from 'moment';

describe('<DatePicker />', () => {

  const selectedStartDate = '2018-01-01';
  const selectedEndDate = '2018-01-01';

  it('Update selected dates before component did mount', () => {

    const wrapper = mount(
      <DatePicker
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        onSelectDate={() => {}}
      />
    );

    wrapper.setProps({ selectedStartDate, selectedEndDate });

    expect(wrapper.state().startDate).toEqual(moment(selectedStartDate));
    expect(wrapper.state().endDate).toEqual(moment(selectedEndDate));

  });

});
