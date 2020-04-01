import React from 'react';
import PropTypes from 'prop-types';

//Components
import Card from './Card';
import CardMark from './Card/CardMark';

import { isInvalidNumber } from 'utils/utilsFn';

const ProductionFlow = (props) => {
  let f = 0;
  const flowItems = (props.productionFlow || []).map((item, index, array) => {

    let aux = index + 1;
    let s = (index > 0) ? Number(array[index - 1].scrap_units) : 0;

    let pb = (index > 0) ? Number(array[index - 1].totalProduction) : 0;
    let pa = (index < (array.length - 1)) ? Number(array[index + 1].totalProduction) : 0;

    const tooltip = item.scrap === 100;
    const mark = ((pa === 0 || Number(item.totalProduction) < pa) && array.length > aux);
    let scrapCount = (Number(item.scrap_units) < 0) ? (Number((item.scrap_units * -1)) + s) * 200 : (Number(item.scrap_units) + s) * 200;
    let valueBorder = (Number(item.scrap) < 100) ? scrapCount / Number(item.totalProduction) : 0;

    let valueHeight = (f > 200) ? 0 : 200 - f;
    f = (Number(item.scrap_units) > 0) ? f + valueBorder : f;

    const cssFlow = (Number(item.scrap) < 100)
      ? { height: valueHeight, borderTopWidth: (valueBorder > 200) ? valueHeight : valueBorder }
      : { height: 0, borderTopWidth: 0 };


    return (
      // eslint-disable-next-line react/no-array-index-key
      <React.Fragment key={index}>
        <Card cssFlow={cssFlow} {...item} tooltip={tooltip} />
        {(mark)
          ? <CardMark />
          : ''
        }
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      <div className="funnel-component">
        <header className="funnel-component-header">
          <h3 className="title is-3">Production flow</h3>
        </header>
        <div className="funnel-component-body">
          <div className="funnel-component-scroll">
            {flowItems}
          </div>
        </div>
        <footer className="funnel-component-footer" />
      </div>
    </React.Fragment>
  );
};

ProductionFlow.defaultProps = {
  productionFlow: []
};

ProductionFlow.propTypes = {
  productionFlow: PropTypes.array
};

export default ProductionFlow;
