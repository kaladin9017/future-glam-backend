const UserModel = require('../../models/index').User;

function all(req, res) {
  UserModel.findAll({})
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    console.log(err) //eslint-disable-line no-console
    res.sendStatus(500)
  });
}

module.exports = all;
