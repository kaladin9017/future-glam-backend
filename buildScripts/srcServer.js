import express from 'express';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import cors from 'cors';
import http from 'http';
const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);
import bodyParser from 'body-parser';
// import expressGraphQL from 'express-graphql';

// Rest Routes
import restRouter from '../restApi/index';

app.use(cors());
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

restRouter(app);

const server = http.createServer(app);
server.listen(port, function(err) {
  if (err) {
    console.log(err) //eslint-disable-line no-console
  }
  else {
    open('http://localhost:'+ port);
  }
});
