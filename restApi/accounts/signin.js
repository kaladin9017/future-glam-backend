const jwt = require('jwt-simple');
const config = require('../../config.js');

/*
  Use user id and app secret to generate random token
  with timestamp
*/
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}


module.exports = function (req, res) {
    return res.send({ token: tokenForUser(req.user) })
  }
