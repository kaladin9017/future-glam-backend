'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    clients: DataTypes.ARRAY(DataTypes.STRING),
    isArtist: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
    beforeCreate: function(account, options, next) {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) { return err }
        bcrypt.hash(account.dataValues.password, salt, null, function(err, hash) {
          if (err) { return err; }
          account.dataValues.password = hash;
          console.log(account)
          next();
        });
    });
    }
  }
  });
  return User;
};
