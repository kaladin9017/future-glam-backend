const UserModel = require('../../models/index').User;
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

module.exports = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.send({ error: 'Email and Password Required' });
  }
  UserModel.findAll({
    where: {
    email:email
    }
  })
  .then(existingUser => {
    if (existingUser.length) {
      return res.status(422).send( { error: 'Email is in use' } );
    }
    else {
      UserModel.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        isArtist: req.body.isArtist
      })
      .then((user)=> {
        return res.json({ token: tokenForUser(user.dataValues) });
      })
      .catch((err) => {
        console.log(err) //eslint-disable-line no-console
        res.sendStatus(500)
      })
    }
    })
  }
