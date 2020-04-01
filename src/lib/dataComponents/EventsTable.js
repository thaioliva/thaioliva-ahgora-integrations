import React from 'react';
import PropTypes from 'prop-types';

import { isMobile } from 'utils/utils';

import Pagination from 'react-js-pagination';

import moment from 'moment';

export default class EventsTable extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 5,
      totalPages: 0,
      items: null
    };
    this.paginator = this.paginator.bind(this);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.data !== this.props.data) {
      if (this.props.data) {
        this.paginator(this.props.data);
      }
    }
  }

  render() {

    const events = (this.state.items || []).map((item, index) => {
      const CSSClass = `title-marked ${
        item.status === 'Running' ? ' is-success' : ''
      }${
        item.status === 'Paused' ? ' is-warning' : ''
      }${
        item.status === 'Stopped' ? ' is-danger' : ''
      }`;
      return (
        <div className="flow-card-content" key={index}>
          <span className={CSSClass}>
            {item.linename} {item.status}
            <span className="title-marked-label">{moment(item.timestamp).format('HH:mm')}</span>
          </span>
          {/* <span className="title is-6 is-dark"></span> */}
        </div>
      );
    });

    return (
      <React.Fragment>

        {events}

        {this.state.totalPages > this.state.perPage ?
          isMobile.any() ?
            <Pagination
              hideFirstLastPages
              prevPageText="Previous"
              nextPageText="Next page"
              activePage={this.state.currentPage}
              itemsCountPerPage={this.state.perPage}
              totalItemsCount={this.state.totalPages}
              pageRangeDisplayed={this.state.perPage}
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
              pageRangeDisplayed={this.state.perPage}
              onChange={this.handlePageChange.bind(this)}
            />
          : null
        }


      </React.Fragment>
    );
  }

  handlePageChange(pageNumber) {
    this.paginator(this.props.data, pageNumber);
  }

  paginator(collection, page = 1) {
    if (!Array.isArray(collection)) {
      console.log('error ' + collection);
    }
    const currentPage = parseInt(page);
    const perPage = parseInt(this.state.perPage);
    const offset = (page - 1) * perPage;
    const paginatedItems = collection.slice(offset, offset + perPage);

    this.setState({
      currentPage: currentPage,
      totalPages: collection.length,
      items: paginatedItems
    });
  }

}

EventsTable.propTypes = { data: PropTypes.array };

EventsTable.defaultProps = { data: [] };
