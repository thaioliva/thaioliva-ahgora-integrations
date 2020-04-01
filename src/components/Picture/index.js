import React from 'react';
import PropTypes from 'prop-types';

const Picture = props => {

  const pictureCSS = `picture`;

  const boxStyles = {
    width: props.width,
    maxWidth: props.maxWidth,
    margin: props.centered ? 'auto' : null
  };

  const sizes = props.sizes.map((source, index) => {
    return (
      <source
        media={`(${source.query === 'max-width' ? 'max-width' : 'min-width'}: ${source.width}px)`}
        srcSet={source.url}
        key={index}
        style={boxStyles}
      />
    );
  });

  return (
    <picture className={pictureCSS} style={boxStyles}>
      {sizes}
      <img src={props.src} alt={props.alt} />
    </picture>
  );
};

Picture.propTypes = {
  sizes: PropTypes.array
};

Picture.defaultProps = {
  sizes: []
};

export default Picture;
