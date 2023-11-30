module.exports = function (options) {
  return {
    ...options,
    devtool: 'source-map', // monorepo模式下面默认是关闭映射源的,断点调试时需要开启
  }
}
