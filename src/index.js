import Mcharts from './mcharts';

var idBase = new Date() - 0;

export var version = '1.0.0';

export function init (dom) {
  var mcharts = new Mcharts(dom);

  if (!dom) {
    throw new Error('Initialize failed: invalid dom.');
  }

  // @TODO 判断dom上面是否已经挂载了mchart实例

  mcharts.id = 'mc_' + idBase++;
  return mcharts;
};
