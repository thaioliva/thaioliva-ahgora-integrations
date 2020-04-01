import React from 'react';
import { mount } from 'enzyme';
import AggregationSizeSelector from './AggregationSizeSelector';

import RouterUtils from 'utils/RouterUtils';
import routerProps from 'utils/RouterUtilsMock';

describe('<AggregationSizeSelector />', () => {

  beforeEach(() => {
    routerProps();
  });

  it('Render the main component', () => {
    const component = mount(<AggregationSizeSelector />);
    expect(component);
  });

  it('Show two inputs type="radio" when timeRange is equal to month', () => {
    RouterUtils.setParam('timeRange', 'month');
    const component = mount(<AggregationSizeSelector />);
    expect(component.find('input').length).toEqual(2);
  });

  it('Dont show any input type="radio" when timeRange is equal to week or day', () => {
    RouterUtils.setParam('timeRange', 'week');
    let component = mount(<AggregationSizeSelector />);
    expect(component.find('input').length).toEqual(0);
    RouterUtils.setParam('timeRange', 'day');
    component = mount(<AggregationSizeSelector />);
    expect(component.find('input').length).toEqual(0);
  });

});
