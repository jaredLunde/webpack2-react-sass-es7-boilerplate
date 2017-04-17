{
  "name": "{{PKG_NAME}}",
  "version": "0.1.0-alpha.0",
  "main": "index.js",
  "private": true,
  "peerDependencies": {
    "react": ">=15.x",
    "react-dom": ">=15.x"
  },
  "devDependencies": {
    "webpack2-react-sass-es7-boilerplate": "^0.2.0"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "scripts": {
    "start": "cross-env NODE_ENV=development node server.js",
    "build": "npm run build:es5 && npm run build:es6",
    "build:es5": "cross-env NODE_ENV=cli babel ./src --out-dir es5",
    "build:es6": "cross-env NODE_ENV=production babel ./src --out-dir ./",
    "build:dist": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "watch:es5": "cross-env NODE_ENV=cli babel ./src -w --out-dir es5",
    "watch:es6": "cross-env NODE_ENV=production babel ./src -w --out-dir ./",
    "start:cli": "npm run node ./src/index.js",
    "node": "cross-env NODE_ENV=cli babel-node",
    "prepublish": "npm run build"
  },
  "analyze": true,
  "license": "MIT"
}
