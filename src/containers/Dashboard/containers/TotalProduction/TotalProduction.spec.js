import React from 'react';
import { mount } from 'enzyme';
import { TotalProduction } from './';
import FlowSection from '../components/FlowSection';
import sinon from 'sinon';

import * as actions from '../../actions';

import RouterUtils from 'utils/RouterUtils';
import routerProps from 'utils/RouterUtilsMock';

describe('<TotalProduction />', () => {

  let component;

  sinon.spy(TotalProduction.prototype, 'handleAggregationSize');

  beforeEach(() => {
    component = mount(<TotalProduction {...routerProps()} />);
    component.setProps({ ...actions });
  });

  it('Render the main component', () => {
    expect(component);
  });

  it('Show FlowSection if timeRange is equal to day', () => {
    RouterUtils.setParam('timeRange', 'day');
    component.setProps({ foo: 'bar' }); // Force update PureComponent passing new props
    expect(component.find(FlowSection).length).toEqual(1);
  });

  it('Hide FlowSection if timeRange is different from day', () => {
    RouterUtils.setParam('timeRange', 'week');
    component.setProps(...RouterUtils);
    expect(component.find(FlowSection).length).toEqual(0);
  });

  it('Execute onChange event from AggregationSizeSelector', () => {
    component.find('input[type="radio"]').first().simulate('change');
    expect(TotalProduction.prototype.handleAggregationSize.calledOnce).toEqual(true);
  });

  it('Execute onChange event from AggregationSizeSelector and get the correct value', () => {
    component.find('input[type="radio"]').last().simulate('change');
    const targetValue = TotalProduction.prototype.handleAggregationSize.args[1][0].target.value;
    expect(targetValue).toBe('day');
  });

});
