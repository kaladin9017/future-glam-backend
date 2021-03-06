const passport = require('passport');
const path = require('path');
const passportService = require('./services/passport'); //eslint-disable-line no-unused-vars


const requireAuth = passport.authenticate('jwt', { session: false }); //eslint-disable-line no-unused-vars
const requireSignin = passport.authenticate('local', { session: false });

// routes
import { findAllUsers, findOneUser} from './accounts/index';
const signup = require('./accounts/signup');
const signin = require('./accounts/signin');

module.exports = function (app) {
  app.get('/api/accounts/all', findAllUsers);
  app.get('/api/accounts/:id', findOneUser);
  app.post('/api/signin', requireSignin, signin);
  app.post('/api/signup', signup);

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
  });
}
