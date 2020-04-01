export default function compareParams(nextProps, props) {

  const nextParams = nextProps.match.params;
  const currentParams = props.match.params;
  const keys = Object.keys(nextParams);

  const equalParams = keys.filter((paramKey) => nextParams[paramKey] !== currentParams[paramKey]);

  return equalParams.length > 0;
};
