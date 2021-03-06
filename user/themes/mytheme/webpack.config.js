const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');



module.exports = (env, argv) => {

  const isDevelopment = argv.mode === 'development';
  
  return {
    entry: './src/code.js',
    output: {
      path: path.resolve(__dirname, 'js'),
      filename: 'josedelrio85.js',
      library: 'josedelrio85',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      // eslint-disable-next-line quotes
      globalObject: `(typeof self !== 'undefined' ? self : this)`,
    },
    module:{
      rules: [
        {
          test:/\.css$/,
          use:['css-loader']
        },
        {
          test: /\.s(a|c)ss$/,
          loader:[
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: false,
                sourceMap: isDevelopment
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                prependData: isDevelopment ? `@import '"${path.resolve(__dirname, "assets/icomoon_dev.scss")}"';` : `@import '"${path.resolve(__dirname, "assets/icomoon.scss")}"';`,
                // prependData: isDevelopment ? `@import 'icomoon_dev.scss';` : 'icomoon.scss', // use this for windows systems only
              }
            },
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env',
                {
                  plugins: ['@babel/plugin-proposal-class-properties'],
                },
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      // Extract imported CSS into own file
      new MiniCssExtractPlugin({
        filename: '../assets/[name].css',
        chunkFilename: '../assets/[id].css'
      }),
      // Minify JS
      new UglifyJsPlugin({
      }),
      // Minify CSS
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!index*'],
      }),
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(!isDevelopment),
        SOU_ID: 79,
        LEADS_URL: isDevelopment ? JSON.stringify('https://leads-pre.josedelrio85.me/lead/store/') : JSON.stringify('https://leads.josedelrio85.me/lead/store/'),
      }),
    ],
    optimization: {
      minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})],
    },
  }
};