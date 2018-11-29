const rollup = require('rollup');
const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint').eslint;

const outputOptions = {
  file: 'dist/mcharts.js', // 文件输出目录
  format: 'umd', // 格式，amd（异步模块定义），cjs（commonjs），es（将软件包保存为es模块文件），iife（适合作为<script>标签），umd（以amd、cjs、iife为一体）
  name: 'mcharts', // 生成包名称，代表你的iife/umd包
  sourcemap: false,
  banner: '/* my-library version  */',
  footer: '/* follow me on Twitter! @rich_harris */',
  intro: 'var ENVIRONMENT = "production";',
  globals: {
    jquery: 'Window.jQuery'
  }
}

module.exports = {
  input: 'src/index.js', // 文件输入 
  output: outputOptions,
  plugins: [
    json(),
    resolve(),
    eslint(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: ['jquery'], // 外链（本项目如要依赖其他第三方的包，就可以使用这个属性） 
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  }
}