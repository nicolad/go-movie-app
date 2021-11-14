const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => ({
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash:8].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/shell/index.html"
    })
  ],
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 3000,
    historyApiFallback: true,
    open: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  }
});
