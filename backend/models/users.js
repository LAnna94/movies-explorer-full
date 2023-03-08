const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/BadRequestError');

const unauthorizedError = new UnauthorizedError('Неправильная почта или пароль');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Введен некорректный email',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
    minLength: 8,
  },
  name: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 30,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((document) => {
      if (!document) {
        throw unauthorizedError;
      }
      return bcrypt.compare(password, document.password)
        .then((matched) => {
          if (!matched) {
            throw unauthorizedError;
          }

          const user = document.toObject();
          delete user.password;
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
