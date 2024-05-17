const path = require("path");

const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
  name: "client",
  entry: path.resolve(__dirname, "./src/client_router/index.tsx"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "",
    clean: true,
  },
  resolve:{
    extensions: ['.js', '.jsx', '.ts', '.tsx'], 
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // 正则表达式，匹配.js或.jsx文件
        exclude: /node_modules/, // 排除node_modules目录
        use: {
          loader: 'babel-loader', // 使用babel-loader
          options: {
            presets: [
              // '@babel/preset-env', // 转换ES6等新特性
              // '@babel/preset-react' // 转换JSX
              '@babel/preset-react', 
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
  target: "web",
  // plugins: [ new WebpackManifestPlugin()],
};
