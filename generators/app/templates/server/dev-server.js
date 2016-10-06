const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.dev');
new WebpackDevServer(webpack(config), {
  historyApiFallback: true,
  stats: {
    colors: true,
  }
})
.listen(8080, '0.0.0.0', function(err) {
  if (err) {
    throw err;
  }
  console.log('Listening at 0.0.0.0:8080');
});

