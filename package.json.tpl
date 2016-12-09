{
  "name": "{{PKG_NAME}}",
  "version": "0.0.1-alpha",
  "main": "index.js",
  "private": true,
  "dependencies": {
    "react": "^15.3.0",
    "react-addons-shallow-compare": "^15.3.0",
    "react-dom": "^15.3.0"
  },
  "devDependencies": {
    "webpack2-react-sass-es7-boilerplate": "^0.1.0"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "scripts": {
    "start": "cross-env NODE_ENV=development node server.js",
    "build": "npm run build:es5 && npm run build:es6",
    "build:es5": "cross-env NODE_ENV=cli babel ./lib --out-dir es5",
    "build:es6": "cross-env NODE_ENV=production babel ./lib --out-dir ./",
    "build:dist": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "start:cli": "npm run node ./lib/index.js",
    "node": "cross-env NODE_ENV=cli babel-node",
    "prepublish": "npm run build"
  },
  "analyze": true,
  "license": "MIT"
}
