var path = require('path')
var webpack = require('webpack')
var ModernizrPlugin = require('modernizr-webpack-plugin')
var deasync = require('deasync')
var publicIp = require('public-ip')
var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require('webpack-dashboard/plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')


var dashboard = new Dashboard()


var modernizrConfig = {
  "filename": "modernizr.js",
  'options': [
    'setClasses',
    'html5printshiv'
  ],
  'feature-detects': [
    "inputtypes",
    "network/connection",
    "touchevents"
  ],
  "minify" : {
    "output": {
      "comments": false,
      "beautify": false,
      "screw_ie8": true
    }
  }
}


var getIp = deasync(function (cb) {publicIp.v4().then(ip => {cb(null, ip)})})


module.exports = {
  // The base directory for resolving the entry option
  context: __dirname,
  devtool: 'eval',

  entry: {
    app: ['webpack-dev-server/client?http://' + getIp() + ':3000',
          'webpack/hot/only-dev-server',
          'react-hot-loader/patch',
          'index.hot'],
    vendor: ['react',
             'react-dom']
  },

  // Various output options, to give us a single bundle.js file with everything resolved and concatenated
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/assets/',
    filename: "{{PKG_NAME}}.dev.js",
    pathinfo: true
  },

  debug: true,

  // Where to resolve our loaders
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  resolve: {
    // Directories that contain our modules
    modules: [path.resolve(__dirname, "lib"), "node_modules"],
    descriptionFiles: ["package.json"],
    moduleExtensions: ["-loader"],
    // Extensions used to resolve modules
    extensions: ['', '.js', '.react.js', '.scss', '.css']
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css?group-css-media-queries!sass'
        })
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/]
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"development"'}}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({names: ["client", "vendor"],
                                             filename: "vendor.dev.js"}),
    new DashboardPlugin(dashboard.setData),
    new ModernizrPlugin(modernizrConfig),
    new ExtractTextPlugin('{{PKG_NAME}}.dev.css')
  ],

  // Include mocks for when node.js specific modules may be required
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
