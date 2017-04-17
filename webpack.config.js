var path = require('path')
var webpack = require('webpack')
// var ModernizrPlugin = require('modernizr-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')


/**
var modernizrConfig = {
  filename: 'modernizr.js',
  options: [
    'setClasses',
    'html5printshiv'
  ],
  'feature-detects': [
    'inputtypes',
    'network/connection',
    'touchevents'
  ],
  minify: {
    output: {
      comments: false,
      beautify: false,
      screw_ie8: true
    }
  }
}
*/


var stripLogs = 'strip-loader?strip[]=console.error' +
                            '&strip[]=console.log' +
                            '&strip[]=console.warn'


module.exports = {
  // The base directory for resolving the entry option
  context: __dirname,

  entry: {
    app: 'index.js',
    vendor: ['babel-polyfill', 'react', 'react-dom']
  },

  // Various output options, to give us a single bundle.js file with everything resolved and concatenated
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'assets/{{PKG_NAME}}.js',
    pathinfo: true
  },

  // Where to resolve our loaders
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')],
    moduleExtensions: ['-loader'],
  },

  resolve: {
    // Directories that contain our modules
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    descriptionFiles: ['package.json'],
    moduleExtensions: ['-loader'],
    // Extensions used to resolve modules
    extensions: ['.js', '.react.js', '.scss', '.css']
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            'css?minifier',
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            'css?minifier',
            'group-css-media-queries',
            'sass'
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|html)$/,
        use: ['file']
      },
      {
        test: /\.js$/,
        use: ['babel-loader', stripLogs],
        exclude: [/node_modules/]
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
    /*
    new ModernizrPlugin(modernizrConfig),
    new webpack.optimize.AggressiveSplittingPlugin({
                minSize: 30000,
                maxSize: 50000
    }),
    */
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor',
                                             filename: 'assets/vendor.js'}),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin('assets/{{PKG_NAME}}.css'),
    new HtmlWebpackPlugin({
      title: '{{PKG_NAME}}',
      filename: 'index.html',
      template: 'index.ejs'
    })
  ],

  // Include mocks for when node.js specific modules may be required
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
