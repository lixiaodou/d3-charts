/**
 * 用户选项和默认选项合并
 * @param {Object} defaultOption
 * @param {Object} option
 */
export function mergeOption (defaultOption, option) {
  var oThis = this;

  var d3 = oThis._d3;
  var optionMap = {};
  defaultOption = defaultOption || d3.map({});
  option = option || {};

  defaultOption.keys().forEach(function (optionKey) {
    optionMap[optionKey] = option[optionKey] || defaultOption.get(optionKey);
  });

  return optionMap;
};
