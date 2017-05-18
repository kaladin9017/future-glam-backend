const UserModel = require('../../models/index').User;

export function findAllUsers(req, res) {
  UserModel.findAll({})
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    console.log(err) //eslint-disable-line no-console
    res.sendStatus(500)
  });
}

export function findOneUser(req, res) {
  UserModel.findOne({})
  .then((data) => {
    res.send(data)
  })
  .catch((err) => {
    console.log(err) //eslint-disable-line no-console
    res.sendStatus(500)
  });
}
