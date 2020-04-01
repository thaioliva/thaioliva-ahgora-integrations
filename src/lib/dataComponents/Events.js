import React from 'react';
import Icon from 'components/Icon';

import EventsTable from './EventsTable';

const Events = (props) => {
  const currentProductionItems = (props.currentProduction || []).map((item, index) => {
    return (
      <div className="flow-card-box" key={index}>
        <div className="wrapper" style={{ width: 410 }}>
          <h3 className="title is-label-large">Current production: {item.lineName}</h3><br/>
          <span className="title is-6 is-dark">
            Current: {item.productionOrder}
          </span><br/>
          <span className="title is-6 is-dark">
            Next: {item.nextProductionOrder}
          </span>
        </div>
        <div className="wrapper">
          <ul className="machine-list">
            <li className="machine is-first" />
            {item.machines.map((item, index) => {
              const CSSClass = `machine ${
                item.status === 'Running' ? ' is-success' : ''
              }${
                item.status === 'Paused' ? ' is-warning' : ''
              }${
                item.status === 'Stopped' ? ' is-danger' : ''
              }`;
              return (
                <li className={CSSClass} key={index}>
                  <Icon name="calculator" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div className="columns is-variable is-4 is-desktop">
        <div className="column is-one-third-desktop">

          <div className="flow-card is-large">
            <div className="flow-card-content is-flex">
              <span className="title is-label-large">Events</span>
            </div>
            <EventsTable data={props.events} />
          </div>

        </div>
        <div className="column is-two-thirds-desktop">

          <div className="flow-card is-large">

            <header className="flow-card-header">
              <h3 className="title is-label-large">Current production</h3>
            </header>

            {currentProductionItems}

          </div>

        </div>
      </div>
    </React.Fragment>
  );
};

export default Events;
