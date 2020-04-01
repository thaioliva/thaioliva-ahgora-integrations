import React from 'react';

// scrap negativo(zera o card - tooltip), produção zerada na anterior ou produção maior na seguinte
const CardMark = () => (
  <div className="funnel-card-mark">
    <div className="tooltip v-center">
      <i className="fas fa-exclamation-triangle" />
      <div className="tooltip-content">
        <p className="text">
          Line interrupted 
        </p>
        <p className="text is-small is-light">
          The next machine may start with bigger or lower production than the expected
        </p>
      </div>
    </div>
  </div>
);

export default CardMark;