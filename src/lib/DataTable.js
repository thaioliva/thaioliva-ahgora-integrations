import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

//Utils
import { roundNumber, percent, isMobile } from 'utils/utils';
import { formatFloatPercent, getTypeOf, deepKey, filterArrayBy, convertToDaysHours } from 'utils/utilsFn';
import Pagination from 'react-js-pagination';
import compareParams from 'utils/compareParams';

export class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filter: false
    };
    this._nodes = new Map();
    this.handleFilter = this.handleFilter.bind(this);
    this.paginator = this.paginator.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.data) !== JSON.stringify(state.items)) {
      return {
        items: (props.data && props.data.orders) ? props.data.orders : props.data
      };
    }
    return null;
  }

  componentDidMount() {
    let data = (this.props.data && this.props.data.orders) ? this.props.data.orders : this.props.data;
    this.paginator(data);
  }

  render() {
    let rows = '';
    let options = null;

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
            formatedValue = convertToDaysHours(value, 'seconds');
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

    if (this.props.data) {
      options = Object.keys(this.props.mapKeys || []).map((item, index) => {
        if (item) {
          let keySpan = index + 'option';
          return (
            <th>
              <span
                className="icon order-icon"
                style={{ display: 'inline-block', cursor: 'pointer' }}
                key={keySpan}
                id={index}
                ref={(c) => this._nodes.set(index, c)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => this.handleFilter(e, index, this.props.mapKeys[item].orderBy)}
                onClick={(e) => this.handleFilter(e, index, this.props.mapKeys[item].orderBy)}>
                <i className="fas fa-angle-up" />
              </span>
            </th>
          );
        } else return '';
      });

      rows = this.state.items.map((item, index) => {
        let keyTr = index;
        let classNameDowntime = '';
        if (this.props.downtime) {
          if (item.hasOwnProperty('End')) {
            classNameDowntime = (item.End.value === null) ? 'datatable-row is-danger' : '';
          }
          if (item.hasOwnProperty('Reason') && classNameDowntime === '') {
            classNameDowntime = (item.Reason === null) ? 'datatable-row is-warning' : '';
          }
        }
        return (
          <tr className={classNameDowntime} key={keyTr + 'tr'}>
            {Object.keys(this.props.mapKeys || item).map((subItem, subIndex) => {
              let keyColunm = subItem;
              let value = item[subItem];
              let format = this.props.mapKeys[subItem].format;
              let mask = null;
              let style = null;

              if (typeof item[subItem] === 'object' && item[subItem]) {
                value = item[subItem].value;
                format = 'datetime';
                mask = (subItem == 'Total time') ? 'seconds' : item[subItem].format;
                style = item[subItem].style;
                keyColunm = moment(value).valueOf();
              }

              return (
                <td
                  className="datatable-col"
                  key={keyColunm + 'td'}
                  style={{
                    maxWidth: this.props.mapKeys[subItem] && this.props.mapKeys[subItem].shrink ? 1 : null,
                    minWidth: 80
                  }}>
                  <div className="datatable-col-header">{this.props.mapKeys ? this.props.mapKeys[subItem].name : subItem}</div>
                  <div className="datatable-col-cel" style={this.props.mapKeys[subItem] ? this.props.mapKeys[subItem].style : null}>
                    {parseTableFormats(value, format, mask)}
                  </div>
                </td>
              );
            })}
          </tr>
        );
      });
    }
    return (
      <React.Fragment>
        <div>
          <table className="datatable">
            {/* {options} */}
            <tbody>
              {(!rows.length && !this.props.error) ?
                <tr>
                  <td>
                    <div className="datatable-loading">
                      <div className="packiot-loading" />
                      <span className="datatable-loading-info">{'Table is fetching data. If it\'s taking too long please select another period.'}</span>
                    </div>
                  </td>
                </tr>
                : this.props.error ?
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
        {/* {this.state.totalPages > this.state.perPage ?
          isMobile.any() ?
            <Pagination
              hideFirstLastPages
              prevPageText=""
              nextPageText=""
              activePage={this.state.currentPage}
              itemsCountPerPage={this.state.perPage}
              totalItemsCount={this.state.totalPages}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
            />
            :
            <Pagination
              hideFirstLastPages
              prevPageText="Previous"
              nextPageText="Next page"
              activePage={this.state.currentPage}
              itemsCountPerPage={this.state.perPage}
              totalItemsCount={this.state.totalPages}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
            />
          : null
        } */}
      </React.Fragment>
    );
  }

  handleFilter(e, i, label) {
    let node = this._nodes.get(i).children[0];
    if (node.getAttribute('class') === 'fas fa-angle-up') node.className = 'fas fa-angle-down';
    else node.className = 'fas fa-angle-up';
    this.handleSort(label, this.state.items);
  }

  handleSort(orderBy, items) {
    if (!this.state.filter) {
      items.sort((array1, array2) => {
        if (deepKey(array1, orderBy) > deepKey(array2, orderBy)) return 1;
        if (deepKey(array1, orderBy) < deepKey(array2, orderBy)) return -1;
        return 0;
      });
    } else {
      items.sort((array1, array2) => {
        if (deepKey(array1, orderBy) < deepKey(array2, orderBy)) return 1;
        if (deepKey(array1, orderBy) > deepKey(array2, orderBy)) return -1;
        return 0;
      });
    }
    this.setState({ items: items, filter: !this.state.filter });
  }

  handlePageChange(pageNumber) {
    this.paginator((this.props.data.orders || this.props.data), pageNumber);
  }

  paginator(collection, page = 1) {
    this.setState({
      items: collection
    });
  }
}

DataTable.propTypes = {};

export default DataTable;
