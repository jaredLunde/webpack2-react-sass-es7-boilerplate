var path = require('path')
var webpack = require('webpack')
var ModernizrPlugin = require('modernizr-webpack-plugin')
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


module.exports = {
  // The base directory for resolving the entry option
  context: __dirname,
  devtool: 'eval',

  entry: {
    app: ['webpack-dev-server/client?http://0.0.0.0:3000',
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

  // Where to resolve our loaders
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
    moduleExtensions: ["-loader"],
  },
  resolve: {
    // Directories that contain our modules
    modules: [path.resolve(__dirname, "lib"), "node_modules"],
    descriptionFiles: ["package.json"],
    moduleExtensions: ["-loader"],
    // Extensions used to resolve modules
    extensions: [ '.js', '.react.js', '.scss', '.css']
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style',
          'css'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style',
          'css',
          'group-css-media-queries',
          'sass'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: ['file']
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({names: ["client", "vendor"],
                                             filename: "vendor.dev.js"}),
    new DashboardPlugin(dashboard.setData),
    new ModernizrPlugin(modernizrConfig)
  ],

  // Include mocks for when node.js specific modules may be required
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
