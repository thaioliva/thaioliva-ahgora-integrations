import React from 'react';
import { mount } from 'enzyme';
import { ProductionFlow } from './';
import sinon from 'sinon';

import * as actions from '../../actions';

import RouterUtils from 'utils/RouterUtils';
import routerProps from 'utils/RouterUtilsMock';

describe('<ProductionFlow />', () => {

  let component;

  beforeEach(() => {
    component = mount(<ProductionFlow {...routerProps()} />);
    component.setProps({ ...actions });
  });

  it('Render the main component', () => {
    expect(component);
  });

  it('Show ProductionFlow if timeRange is equal to day', () => {
    RouterUtils.setParam('timeRange', 'day');
    component.setProps({ foo: 'bar' }); // Force update PureComponent passing new props
    expect(component.find(ProductionFlow).length).toEqual(1);
  });

  it('Hide ProductionFlow if timeRange is different from day', () => {
    RouterUtils.setParam('timeRange', 'week');
    component.setProps(...RouterUtils);
    expect(component.find(ProductionFlow).length).toEqual(0);
  });

});
