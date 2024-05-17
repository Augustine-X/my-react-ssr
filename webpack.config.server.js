const nodeExternals = require("webpack-node-externals");
const path = require("node:path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  name: "server",
  entry: {
    server: path.resolve(__dirname, "./src/server/server_react_router.tsx"),
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve:{
    extensions: ['.js', '.jsx', '.ts', '.tsx'], 
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx)$/, // 正则表达式，匹配.js或.jsx文件
        exclude: /node_modules/, // 排除node_modules目录
        use: {
          loader: 'babel-loader', // 使用babel-loader
          options: {
            presets: [
              '@babel/preset-env', // 转换ES6等新特性
              '@babel/preset-react', // 转换JSX
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.css$/, // 正则表达式，匹配.css文件
        use: [
          'style-loader', // 将CSS作为样式添加到DOM
          'css-loader' // 将CSS文件转换成commonjs模块
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  externals: [nodeExternals()],
  target: "node",
  node: {
    __dirname: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ context: "./src/server/", from: "template", to: "template" }],
    }),
  ],
};
