# webpack2-react-sass-es7-boilerplate
A boilerplate package for writing ES7 React components with SCSS, Webpack 2 and Babel

Check out [webpack2-react-sass-env-boilerplate](https://github.com/jaredlunde/webpack2-react-sass-env-boilerplate)
for a more up-to-date example of working with Webpack 2.2, Babel 6, React and SASS which utilizes
`babel-preset-env` instead of `babel-preset-es2015 ...` or `babel-preset-latest`


## To use with a bash script:
1. Create `create-es-app` executable
```sh
echo '#!/bin/bash
if [ -z "$1" ]; then
  echo "No package name was provided."
  exit 1
fi

PKG_NAME=$1
mkdir $PKG_NAME
cd $PKG_NAME
npm init -y
npm install webpack2-react-sass-es7-boilerplate
cp -r ./node_modules/webpack2-react-sass-es7-boilerplate/. ./
mv package.json.tpl package.json
find . -type f \( -name "*.html" -o -name "*.ejs" -o -name "*.js" -o -name "*.json" \) -and -not -path "*/node_modules/*" -exec sed -i.bak -e "s/{{PKG_NAME}}/${PKG_NAME}/g" {} \;;
find . -type f -name "*.bak" -and -not -path "*/node_modules/*" -exec rm {} \;;
mv "./assets/css/{{PKG_NAME}}" "./assets/css/${PKG_NAME}"
npm start' > create-es-app
```

2. Make sure you can execute the script
```sh
chmod 0744 create-es-app
```

3. Execute the script w/ a package name
```sh
./create-es-app your-pkg-name
```
