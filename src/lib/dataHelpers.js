import { colors } from 'core/constants';
import { checkObjectKeys, fixNumber, isInvalidNumber, prettyNumber } from 'utils/utilsFn';
import moment from 'moment';

export default {

  /**
   * Return calculated scrap on total production
   * @param  {Object} data
   * @return {String}
   */
  scrapOnTotalProduction: (data) => {
    if (!data) return;
    // Check if all necessary keys exist in the object
    if (!checkObjectKeys(data, ['scrapacum', 'acumTotal'])) return;
    const scrap = ((data.scrapacum / (data.acumTotal + data.scrapacum)) * 100);
    if (isInvalidNumber(scrap)) return 'N.A.';
    return fixNumber(scrap, 2, 'pt-BR');
  },

  /**
   * Return calculated scrap on single period
   * @param  {Object} data
   * @return {String}
   */
  scrapOnSinglePeriod: (data) => {
    if (!data) return;
    // Check if all necessary keys exist in the object
    if (!checkObjectKeys(data, ['scrap', 'countTotal'])) return;
    const scrap = ((data.scrap / (data.countTotal + data.scrap)) * 100);
    if (isInvalidNumber(scrap)) return 'N.A.';
    return fixNumber(scrap, 2, 'pt-BR');
  },

  /**
   * Return calculated goal on total production
   * @param  {Object} data
   * @return {String}
   */
  toGoalOnTotalProduction: (data) => {
    if (!data) return;
    // Check if all necessary keys exist in the object
    if (!checkObjectKeys(data, ['target', 'acumTotal'])) return;
    const value = (((data.acumTotal - data.target) / data.target) * 100);
    if (isInvalidNumber(value)) return 'N.A.';
    return fixNumber(value, 0, 'pt-BR');
  },

  /**
   * Return calculated goal on single period
   * @param  {Object} data
   * @return {String}
   */
  toGoalOnSinglePeriod: (data) => {
    if (!data) return;
    // Check if all necessary keys exist in the object
    if (!checkObjectKeys(data, ['singlePeriodTarget', 'countTotal'])) return;
    const value = (((data.countTotal - data.singlePeriodTarget) / data.singlePeriodTarget) * 100);
    if (isInvalidNumber(value)) return 'N.A.';
    return fixNumber(value, 0, 'pt-BR');
  },

  /**
   * Return total production value formated
   * @param  {Number} value
   * @return {String}
   */
  totalProduction: (value) => prettyNumber(value, 2, 'pt-BR'),

  /**
   * Return period production value formated
   * @param  {Number} value
   * @return {String}
   */
  periodProduction: (value) => prettyNumber(value, 2, 'pt-BR'),

  /**
   * Return calculated scrap on scrap tab
   * @param  {Object} data
   * @return {String}
   */
  calculatedScrap: (data) => {
    if (!data) return;
    // Check if all necessary keys exist in the object
    if (!checkObjectKeys(data, ['scrap', 'countTotal'])) return;
    const scrap = ((data.scrap / (data.countTotal + data.scrap)) * 100);
    if (scrap > 100) return 'N.A.';
    if (scrap < -100) return 'N.A.';
    if (isInvalidNumber(scrap)) return 'N.A.';
    return fixNumber(scrap, 2, 'pt-BR');
  },

  /**
   * Return the scrap reference value
   * @param  {Object} data
   * @return {String}
   */
  scrapReference: (data) => {
    if (!data) return;
    // Check if all necessary keys exist in the object
    if (!checkObjectKeys(data, ['scrapAverage', 'singlePeriodAverage'])) return;
    const scrap = ((data.scrapAverage / (data.scrapAverage + data.singlePeriodAverage)) * 100);
    if (isInvalidNumber(scrap)) return 0;
    return scrap;
  },

  /**
   * Create an array of two objects: Scrap and Good Parts
   * @param  {Array} data [api/production array]
   * @return {Array}
   */
  scrapAndGoodParts: (data) => {
    if (!data) return;
    let scrapAmount = 0;
    let goodPartsAmount = 0;
    let scrapData = [];
    data.forEach((item) => {
      // Check if all necessary keys exist in the object
      if (!checkObjectKeys(item, ['scrapacum', 'acumTotal'])) return;
      scrapAmount = item.scrapacum ? item.scrapacum : scrapAmount;
      goodPartsAmount = item.acumTotal ? item.acumTotal : goodPartsAmount;
    });
    scrapData.push({ name: 'Good Parts', value: goodPartsAmount, color: colors.primary.blue, highlight: false });
    scrapData.push({ name: 'Scrap', value: scrapAmount, color: colors.primary.red, highlight: false });
    return scrapData;
  },

 /**
   * Create an array of two objects: Scrap and Good Parts
   * @param  {Array} data [api/production array]
   * @return {Array}
   */
  oeeCalc: (data) => {
    if (!data) return;
    let oeeData = [];
    let a = parseFloat(data).toFixed(2) * 100;
    let b = 100 - a;

    oeeData.push({ name: 'OEE', value: a, color: colors.primary.blue, highlight: false });
    oeeData.push({ name: '', value: b, color: 'transparent', highlight: false });
    return oeeData;
  },

  /**
   * Create an array of status: Running and Downtime
   * @param  {Array} data [api/production array]
   * @return {Array}
   */
  efficiency: (data) => {
    if (!data) return;
    let efficiencyData = [];
    data.forEach((item) => {
      // Check if all necessary keys exist in the object
      if (!checkObjectKeys(item, ['totaltime.value', 'lineStatus'])) return;
      let tooltipValue = (moment.unix(item.totaltime.value).valueOf() / 3600000); // In seconds
      tooltipValue = fixNumber(tooltipValue, 1) + 'h';
      efficiencyData.push({
        name: item.lineStatus,
        value: item.totaltime.value,
        color: item.lineStatus === 'Running' ? colors.primary.blue : colors.primary.red,
        highlight: item.name === 'Downtime',
        tooltipValue: tooltipValue
      });
    });
    return efficiencyData;
  },

  /**
   * Return calculated efficiency on total production
   * @param  {Object} data
   * @return {String}
   */
  efficiencyOnTotalProduction: (data) => {
    if (!data) return;
    // Check if all necessary keys exist in the object
    if (!checkObjectKeys(data, ['efficiency'])) return;
   // const scrap = ((data.scrapacum / (data.acumTotal + data.scrapacum)) * 100);
    if (isInvalidNumber(data.efficiency)) return 'N.A.';
    return fixNumber(data.efficiency, 2, 'pt-BR');
  }

};
