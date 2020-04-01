export default function buildPath(overwritePath, props) {
  const path = {
    companyId: props.match.params.companyId,
    app: 'analytics',
    view: props.match.params.view || 'dashboard',
    sector: props.match.params.sector || 'factory',
    timeRange: props.match.params.timeRange || 'month',
    component: props.match.params.component || 'lines',
    componentId: props.match.params.componentId || 'ALL',
    tab: props.match.params.tab || 'total-production'
  };
  let pathNewObject = Object.assign({}, path, overwritePath);
  let pathArray = [];
  Object.keys(pathNewObject).forEach((item) => {
    if (
      pathNewObject[item] !== 'undefined' &&
      pathNewObject[item] !== 'null' &&
      pathNewObject[item] !== undefined &&
      pathNewObject[item] !== null
    ) pathArray.push(pathNewObject[item]);
  });
  return `/app/${pathArray.join('/')}`;
};
