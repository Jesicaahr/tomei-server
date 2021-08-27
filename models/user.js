'use strict';
const {
  Model, Op
} = require('sequelize');
const { encryptPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input your name",
        },
        notEmpty: {
          args: true,
          msg: "Please input your name",
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Input valid email",
        },
        notNull: {
          args: true,
          msg: "Please input your email",
        },
        notEmpty: {
          args: true,
          msg: "Please input your email",
        },
        isUnique: function (value) {
          return new Promise((resolve, reject) => {
            User.findOne({
              where: {
                email: value,
                id: {[Op.ne]: this.id}
              }
            })
            .then(function (user) {
              if(user) {
                reject('Email already exist')
              } else {
                resolve(true)
              }
            })
            .catch((err) => {
              reject(false)
            })
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input your password",
        },
        notEmpty: {
          args: true,
          msg: "Please input your password",
        },
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please upload your avatar",
        },
        notEmpty: {
          args: true,
          msg: "Please upload your avatar",
        },
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, option) {
        user.password = encryptPassword(user.password)
      }
    }
  });
  return User;
};