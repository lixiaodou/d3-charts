import * as d3 from 'd3';
import * as components from './component';
import { mergeOption } from './util/util-component';

var idStart = 0x0907;

var comPre = '_mc_component_';

function Zrender (id, dom, opt) {
  opt = opt || {};
  this._id = id;
  this._dom = dom;
  this._d3 = d3;

  this.initRenderer(dom);
}

var zrenderProto = Zrender.prototype;

/**
 * 初始化渲染器（生成svg和内框的div）
 * @param {HTMLElement} dom
 */
zrenderProto.initRenderer = function (dom) {
  var domWidtn = dom.clientWidth;
  var domHeight = dom.clientHeight;
  var innerDiv = this._innerDiv = d3.select(dom)
    .append('div')
    .style('width', domWidtn + 'px')
    .style('height', domHeight + 'px')
    .style('overflow', 'hidden')
    .style('position', 'relative');

  this._svg = innerDiv.append('svg')
    .attr('width', domWidtn)
    .attr('height', domHeight)
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('version', '1.1')
    .attr('baseProfile', 'full')
    .style('user-select', 'none')
    .style('position', 'absolute')
    .style('left', 0)
    .style('top', 0);
};

zrenderProto.setOption = function (option) {
  var oThis = this;

  var componentsMap = oThis._componentMap = d3.map({});

  var optionMap = oThis._optionsMap = d3.map(option);

  var allComponentsMap = d3.map(components);

  var gridComponent = null;

  // 属性中是否包含series属性，如果没有包含直接抛出异常
  if (!optionMap.has('series')) {
    throw new Error('series is need');
  }

  allComponentsMap.keys().forEach(function (componentType) {
    var component = allComponentsMap.get(componentType);

    // 本次渲染使用到的组件以及默认属性的赋值
    if (optionMap.has(componentType)) {
      // @TODO 需要考虑数组的情况
      componentsMap.set(componentType, component);
      var defaultOptionsMap = component && d3.map(component['defaultOptions']);
      optionMap.set(componentType, mergeOption.call(oThis, defaultOptionsMap, optionMap.get(componentType)));
    }
  });

  // 属性中是否包含绘图网格
  if (!optionMap.has('grid')) {
    gridComponent = allComponentsMap.get('grid');
    componentsMap.set('grid', gridComponent);
    var defaultOptionsMap = gridComponent && d3.map(gridComponent['defaultOptions']);
    optionMap.set('grid', mergeOption.call(oThis, defaultOptionsMap, optionMap.get('grid')));
  }

  // 绘制网格
  gridComponent = gridComponent || componentsMap.get('grid');

  gridComponent.render.call(oThis);
  console.log('gridComponent', gridComponent);
};

zrenderProto.initGrid = function () {
  var oThis = this;
  var componentMap = oThis._componentMap;
  var gridComponet = componentMap[comPre + oThis._id + '_grid'];
  console.log(gridComponet, 'gridComponet');
  // gridComponet.
};

zrenderProto.initComponentsOpt = function () {
  // var oThis = this;
  // var componentMap = oThis._componentMap;
  // var gridComponet = componentMap[comPre + oThis._id + '_grid'];
  // console.log(gridComponet, 'gridComponet');
};

zrenderProto.initComponentsView = function () { };

/**
 * 初始化
 * @param {HTMLElement} dom
 * @param {Object} opt
 * @param {Object} d3
 */
export function init (dom, opt) {
  var zr = new Zrender(idStart++, dom, opt);

  return zr;
}
