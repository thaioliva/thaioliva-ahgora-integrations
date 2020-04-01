import RouterUtils from './RouterUtils';
import routerProps from 'utils/RouterUtilsMock';

describe('RouterUtils', () => {

  routerProps();

  it('Expect to have push, replace and constant method', () => {
    expect(RouterUtils).toHaveProperty('constant');
  });

  it('Expect constant isDay to be false', () => {
    expect(RouterUtils.constant('isDay')).toBe(false);
  });

  it('Expect constant isDay to be true', () => {
    RouterUtils.setParam('timeRange', 'day');
    expect(RouterUtils.constant('isDay')).toBe(true);
  });

});
