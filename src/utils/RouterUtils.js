/**
 * @class RouterUtils
 * @author @cspilhere
 */

class RouterUtils {

  constructor() {
    this.params = {};
    this.constants = {};
  }

  getParam(key) {
    return this.params[key];
  }

  getConstant(key) {
    if (!this) return;
    if (typeof this.constants[key] === 'function') return this.constants[key](this.params);
    else return this.constants[key];
  }

  setConstant(newConstantKey, value) {
    this.constants[newConstantKey] = value;
  }

  setParam(newParamKey, value) {
    this.params[newParamKey] = value;
  }

  setup() {
    this.constant = (key) => this.getConstant(key);
    this.param = (key) => this.getParam(key);
  }

}

// Export RouterUtils
let Instance = null;
if (!(Instance instanceof RouterUtils)) Instance = new RouterUtils();
export default Instance;
