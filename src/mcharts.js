import * as zrender from './zrender';

function Mcharts (dom, opt) {
  this.id;

  this._dom = dom;
  // 生成渲染器
  this._zr = zrender.init(dom, opt);
}

var mchartsProto = Mcharts.prototype;

mchartsProto.setOption = function (option) {
  option = option || {};
  this._zr.setOption(option);
};

export default Mcharts;
