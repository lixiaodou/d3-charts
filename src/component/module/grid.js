import { isNotNull, judgeLengthType } from '../../util/util-string';

/**
 * 计算dom的长度
 * @param {string|number} length 使用的长度
 * @param {string|number} outLength 外框的长度
 * @param {string|number} offsetLeft 偏移量（可以是top偏移量）
 * @param {string|number} offsetRight 偏移量（可以是bottom偏移量）
 */
// function calcLength (length, outLength, offsetLeft, offsetRight) {
//   // 外框长度不可以使用
//   if (!isNotNull(outLength)) {
//     return 0;
//   }

//   var returnLength = outLength;
//   offsetLeft = judgeLengthType(offsetLeft);
//   offsetRight = judgeLengthType(offsetRight);

//   // 如果length为auto, 外框的长度减去偏移量
//   if (length === 'auto') {
//     returnLength = returnLength - (offsetLeft.type === '%' ? outLength * offsetLeft.value : offsetLeft.value);
//     returnLength = returnLength - (offsetRight.type === '%' ? outLength * offsetRight.value : offsetRight.value);
//   } else {
//     length = judgeLengthType(length);
//     returnLength = length.type === '%' ? length.value * outLength : length.value;
//   }

//   return returnLength;
// }

/**
 * 计算轨迹
 * @param {Object} option 属性{outWidht, outHeight, widht, height, top, bottom, left, right}
 * @return {Array} 轨迹的坐标数组[左下, 右下, 右上, 左上]，左下: [x, y]
 */
function getPositions (option) {
  option = option || {};
  var returnWidht = isNotNull(option.outWidht) ? option.outWidht : 0;
  var returnHeight = isNotNull(option.outHeight) ? option.outHeight : 0;

  var objLeft = judgeLengthType(option.left);
  var objRight = judgeLengthType(option.right);

  var offsetLeft = (objLeft.type === '%' ? option.outWidht * objLeft.value : objLeft.value);
  var offsetRight = (objRight.type === '%' ? option.outWidht * objRight.value : objRight.value);

  var objTop = judgeLengthType(option.top);
  var objBottom = judgeLengthType(option.bottom);

  var offsetTop = (objTop.type === '%' ? option.outWidht * objTop.value : objTop.value);
  var offsetBottom = (objBottom.type === '%' ? option.outWidht * objBottom.value : objBottom.value);

  if (option.widht === 'auto') {
    returnWidht = returnWidht - offsetLeft - offsetRight;
  } else {
    var widht = judgeLengthType(option.widht);
    returnWidht = widht.type === '%' ? widht.value * option.outWidht : widht.value;
  }

  if (option.height === 'auto') {
    returnHeight = returnHeight - offsetTop - offsetBottom;
  } else {
    var height = judgeLengthType(option.widht);
    returnHeight = height.type === '%' ? height.value * option.outHeight : height.value;
  }

  return [[offsetLeft, returnHeight + offsetTop], [offsetLeft, offsetTop], [offsetLeft + returnWidht, offsetTop], [offsetLeft + returnWidht, offsetTop + returnHeight]];
}

export default {
  type: 'grid',
  defaultOptions: {
    show: true,
    left: '10%',
    right: '10%',
    top: 60,
    bottom: 60,
    width: 'auto',
    height: 'auto',
    backgroundColor: 'transparent',
    borderColor: '#ccc',
    borderWidth: 1
  },
  render: function () {
    var oThis = this;
    var svg = oThis._svg;
    var defaultOptions = oThis._componentMap.get('grid')['defaultOptions'];

    var gridOption = oThis._optionsMap.get('grid');
    var domWidth = svg.attr('width');
    var domHeight = svg.attr('height');
    var positionOption = {
      outWidht: domWidth,
      outHeight: domHeight,
      widht: gridOption.width,
      height: gridOption.height,
      top: gridOption.top,
      bottom: gridOption.bottom,
      left: gridOption.left,
      right: gridOption.right
    };
    var position = oThis._gridPosition = getPositions(positionOption);
    var d = 'M ' + position[0].join(' ') + ' L ' + position[1].join(' ') + ' L ' + position[2].join(' ') + ' L ' + position[3].join(' ') + ' Z';
    svg.append('path')
      .attr('d', d)
      .attr('fill', gridOption.backgroundColor)
      .attr('stroke', gridOption.borderColor)
      .attr('stroke-width', judgeLengthType(gridOption.borderWidth).type === 'px' ? gridOption.borderWidth : defaultOptions.borderWidth);
  }
};
