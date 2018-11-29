/**
 * 判断是否为空，比如null|undefined
 * @param {*} param 判断参数
 */
export function isNotNull (param) {
  if (typeof param === 'undefined') {
    return false;
  }

  if (param === null) {
    return false;
  }

  if (param === '') {
    return false;
  }

  return true;
};

/**
 * 判断长度类型,如：'10%'|10|'10px'等等
 * @param {string|number} lenght
 */
export function judgeLengthType (lenght) {
  var value = 0;
  if (!isNotNull(lenght)) {
    return {
      type: 'px',
      value: value
    };
  }

  var pxReg = /^-?\d+?(.\d+)?px$/;
  var numReg = /^-?\d+?(.\d+)?(px)?$/;
  var pereReg = /-?^\d+?(.\d+)?%$/;

  if (pxReg.test(lenght)) {
    value = Number.parseInt(lenght.replace('px', ''));
    return {
      type: 'px',
      value: value
    };
  }

  if (numReg.test(lenght)) {
    value = Number.parseInt(lenght);
    return {
      type: 'px',
      value: value
    };
  }

  if (pereReg.test(lenght)) {
    value = Number.parseInt(lenght.replace('%', '')) / 100;
    return {
      type: '%',
      value: value
    };
  }

  return {
    type: 'px',
    value: value
  };
};
