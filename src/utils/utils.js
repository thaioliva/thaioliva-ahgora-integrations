import moment from 'moment';

// Round numbers
export function roundNumber(number, returnObject, decimalNumber = null) {
  let value = 0;
  let numberNegative = number < 0;
  number = (numberNegative) ? (number * -1) : number;

  let dNumber = (decimalNumber !== null) ? decimalNumber : 2;
  if (number / 1000 < 1) value = number;
  if (number / 1000 > 1 && number / 1000 < 1001) value = float((number / 1000), dNumber, dNumber) + 'K';
  if (number / 1000 > 1000) value = float((number / 1000000), dNumber, dNumber) + 'MM';
  if (returnObject) {
    value = {};
    if (number / 1000 < 1) value.value = number;
    if (number / 1000 > 1 && number / 1000 < 1001) {
      value.value = float((number / 1000), dNumber, dNumber);
      value.token = 'K';
    }
    if (number / 1000 > 1000) {
      value.value = float((number / 1000000), dNumber, dNumber);
      value.token = 'MM';
    }
  }

  return (numberNegative) ? '-' + value : value;
};

// Get percentage
export function percent(num, per, maxFloat) {
  if (num !== Infinity || num !== undefined || num !== NaN || num !== 'NaN' || num !== '-∞' || num !== '∞') {
    let value = (per * 100) / num;
    if (!per) value = num;
    if (value == Infinity || value == -Infinity || value == undefined || value == NaN || value == 'NaN' || value == '-∞' || value == '∞') return 'N.A.';
    return float(value, 0, maxFloat || 2);
  }
  return 0;
};

// Compare params to update data
export function compareParams(nextProps, props) {
  return (
    nextProps.match.params.companyId !== props.match.params.companyId ||
    nextProps.match.params.app !== props.match.params.app ||
    nextProps.match.params.view !== props.match.params.view ||
    nextProps.match.params.sector !== props.match.params.sector ||
    nextProps.match.params.timeRange !== props.match.params.timeRange ||
    nextProps.match.params.component !== props.match.params.component ||
    nextProps.match.params.componentId !== props.match.params.componentId ||
    nextProps.match.params.tab !== props.match.params.tab
  );
};

export function buildQuery(params) {

  let pathArray = [];

  Object.keys(params).forEach((item) => {
    if (
      params[item] !== 'undefined' &&
      params[item] !== 'null' &&
      params[item] !== undefined &&
      params[item] !== null
    ) pathArray.push(`${item}=${params[item].toUpperCase()}`);
  });

  // parseQuery

  return `?${pathArray.join('&')}`;

};

export function buildQueryParams(params) {

  let pathArray = [];

  Object.keys(params).forEach((item) => {
    if (
      params[item] !== 'undefined' &&
      params[item] !== 'null' &&
      params[item] !== undefined &&
      params[item] !== null
    ) pathArray.push(`${item}=${params[item]}`);
  });

  return `?${pathArray.join('&')}`;

  // const aggregationSize = props.match.params.aggregationSize;
  // return {
  //   object: props.match.params.object,
  //   objectId: props.match.params.objectId,
  //   timeRange: props.match.params.viewType.toUpperCase(),
  //   aggregationSize: aggregationSize ? aggregationSize.replace('by-', '').toUpperCase() : null
  // };
};

// Update params and push new route state
export function goto(param) {
  let path = this.props.match.path;
  Object.keys(this.props.match.params).forEach((key) => {
    if (path.match(':' + key) && param.hasOwnProperty(key)) {
      path = path.replace(':' + key, param[key]);
      path = path.replace('?', '');
    } else {
      if (this.props.match.params[key] === 'undefined' || this.props.match.params[key] === undefined) {
        path = path.replace(':' + key, '');
        path = path.replace('?', '');
      } else {
        path = path.replace(':' + key, this.props.match.params[key]);
        path = path.replace('?', '');
      }
    }
  });
  this.props.history.push(path);
};

export const isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

export function uuid() {
  let time = () => new Date();
  let uuid = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + time().getTime();
  return uuid();
};


function isInt(n){
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}

export function float(value, min, max) {
  if (!isFloat(value)) return value + '';
  return parseFloat(value).toLocaleString('de-DE', {
    maximumFractionDigits: max,
    minimumFractionDigits: min
  });
};

export function camelCaseToDash(string) {
  if (!string) return string;
  return string.replace(/([A-Z])/g, '-$1').toLowerCase();
};

export const getType = any => toString.call(any).slice(8, -1);

export function classProps(condition, className) {
  return condition ? className : '';
};

export function parsePropsAsBulmaClasses(componentProps) {
  const props = Object.keys(componentProps);
  const classNames = [];
  props.forEach((propsKey) => {
    if (propsKey.match(/(is|has)([A-Z|0-9]{1})/g) && componentProps[propsKey]) classNames.push(camelCaseToDash(propsKey));
  });
  return classNames.join(' ');
};

export function arrayMove(array, currentIndex, offset) {
  let removedItem = null;
  const index = currentIndex;
  const newIndex = index + offset;
  if (newIndex > -1 && newIndex < array.length) removedItem = array.splice(index, 1)[0];
  array.splice(newIndex, 0, removedItem);
  return array;
};

// Checker and parser for custom range
export function customRangeCheck(timeRange) {
  const isCustomRange = timeRange.match('custom');
  let startDate = null;
  let endDate = null;
  if (isCustomRange) {
    startDate = timeRange.split(',')[0].replace('custom[', '');
    endDate = timeRange.split(',')[1].replace(']', '');
  }
  return {
    is: isCustomRange,
    startDate: moment(startDate).unix(),
    endDate: moment(endDate).unix()
  };
};

// export function parseQuery(query) {
//   const customRange = customRangeCheck(query);
//   return `${
//     customRange.is ? '?' : '?timeRange=' + query.timeRange
//   }&aggregationSize=${
//     query.aggregationSize
//   }${
//   }`;
// };


/**
 * Custom parser for custom range query
 * @param  {String} value
 * @param  {String} key
 * @return {String} query
 */
export function queryCustomRange(value, key) {
  const isCustomRange = value.match('custom');
  if (isCustomRange) {
    const startDate = value.split(',')[0].replace('custom[', '');
    const endDate = value.split(',')[1].replace(']', '');
    return `customTimeBegin=${moment(startDate).unix()}&customTimeEnd=${moment(endDate).unix()}`;
  }
  return null;
}
