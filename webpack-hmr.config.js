// nếu chạy start:dev mậc định thì sẽ sử dụng trình biên dịch ts để tải toàn bộ,
// còn sử dụng webpack-hmr thì chỉ tải lại phần thay đổi, sẽ tối ưu và nhanh hơn
// Refs: https://docs.nestjs.com/recipes/hot-reload#installation

const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({
        name: options.output.filename,
        autoRestart: true,
      }),
    ],
  };
};
