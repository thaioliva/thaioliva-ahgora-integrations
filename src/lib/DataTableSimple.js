import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

//Utils
import { roundNumber, percent } from 'utils/utils';
import { formatFloatPercent } from 'utils/utilsFn';

const DataTableSimple = (props) => {
  // const t = (index, item) => (props.n(index, item));

  let rows = '';

  if (props.data) {

    rows = (props.data.orders || props.data || []).map((item, index) => {
      return (
        <tr className="datatable-row" key={index}>
          {Object.keys(props.mapKeys || item).map((subItem, subIndex) => {

            let value = item[subItem];
            let format = props.mapKeys[subItem].format;
            let mask = null;
            let style = null;

            if (typeof item[subItem] === 'object' && item[subItem]) {
              value = item[subItem].value;
              format = 'datetime';
              mask = item[subItem].format;
              style = item[subItem].style;
            }

            return (
              <td
                className="datatable-col"
                key={subIndex}
                style={{
                  maxWidth: props.mapKeys[subItem] && props.mapKeys[subItem].shrink ? 1 : null,
                  minWidth: 80
                }}>
                <div className="datatable-col-header">{props.mapKeys ? props.mapKeys[subItem].name : subItem}</div>
                <div className="datatable-col-cel" style={props.mapKeys[subItem] ? props.mapKeys[subItem].style : null}>
                  {parseTableFormats(value, format, mask)}
                </div>
              </td>
            );
          })}
        </tr>
      )
    });
  }

  return (
    <div>
      <table className="datatable">
        <tbody>
          {(!rows.length && !props.error) ?
            <tr>
              <td>
                <div className="datatable-loading">
                  <div className="packiot-loading" />
                  <span className="datatable-loading-info">{'Table is fetching data. If it\'s taking too long please select another period.'}</span>
                </div>
              </td>
            </tr>
            : props.error ?
              <tr>
                <td>
                  <div className="datatable-loading">
                    <div className="packiot-loading" />
                    <span className="datatable-loading-info">{'Oops something went wrong. Please try again later.'}</span>
                  </div>
                </td>
              </tr>
              : rows
          }
        </tbody>
      </table>
    </div>
  );
};

const parseTableFormats = (value, format, mask) => {
  let formatedValue = value;
  switch (format) {
    case 'string':
      formatedValue = formatedValue || '-';
      break;
    case 'number':
      formatedValue = roundNumber(formatedValue);
      break;
    case 'scrap':
      formatedValue = formatFloatPercent(formatedValue);
      break;
    case 'datetime':
      if (mask === 'seconds') {
        //formatedValue = parseInt(value) + ' Seconds';
        formatedValue = moment.utc(value * 1000).format('HH:mm:ss');
        break;
      }
      formatedValue = (value == NaN || value == null) ? '-' : (mask == 'HH:mm')
        ? moment.unix(value).utc().format(mask)
        : moment(value).format(mask);
      break;
    case 'status':
      const CSSClass = `span ${
        value === 'Completed' ? 'is-success' : ''
        }${
        value === 'In progress' ? 'is-brand' : ''
        }${
        value === 'Stopped' ? 'is-danger' : ''
        }`;
      formatedValue = <span className={CSSClass}>{value}</span>;
      break;
    default:
      break;
  }
  return formatedValue;
};

DataTableSimple.propTypes = {};

export default DataTableSimple;
