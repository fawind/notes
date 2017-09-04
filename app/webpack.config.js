const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  root: path.resolve(__dirname),
  nodeModules: path.resolve(__dirname, 'node_modules'),
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

const DEV_SERVER = {
  hot: true,
  hotOnly: true,
  historyApiFallback: true,
  overlay: true,
  proxy: {
    '/api': 'http://localhost:9090'
  },
};

module.exports = (env = {}) => {
  console.log({ env });
  const isBuild = !!env.build;
  const isDev = !env.build;
  const isSourceMap = !!env.sourceMap || isDev;

  return {
    cache: true,
    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: DEV_SERVER,

    context: PATHS.root,

    entry: {
      app: [
        'react-hot-loader/patch',
        path.join(PATHS.src, 'index.tsx'),
      ],
    },
    output: {
      path: PATHS.dist,
      filename: isDev ? '[name].js' : '[name].[hash].js',
      publicPath: '/',
    },

    resolve: {
      alias: { '@src': PATHS.src },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      modules: ['src', 'node_modules'],
    },

    module: {
      rules: [
        {
          test: /\.(tsx?|jsx?)$/,
          include: PATHS.src,
          use: [
            { loader: 'react-hot-loader/webpack' },
            {
              loader: 'awesome-typescript-loader',
              options: {
                transpileOnly: true,
                useTranspileModule: false,
                sourceMap: isSourceMap,
              },
            },
          ],
        },
        {
          test: /\.json$/,
          include: [PATHS.src],
          use: { loader: 'json-loader' },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpg|svg)$/,
          use: 'url-loader?limit=10000'
        },
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash].[ext]',
            },
          },
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
      }),

      ...(isDev ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
      ] : []),

      ...(isBuild ? [
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          compress: {
            screw_ie8: true,
            warnings: false,
          },
          comments: false,
          sourceMap: isSourceMap,
        }),
        new CopyWebpackPlugin([
          { from: './favicon.png', to: PATHS.dist },
        ]),
      ] : []),
    ]
  };
};
