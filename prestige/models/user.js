const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

/*UserSchema.pre('save', function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) { return next(err); }
    user.password = hash;
    return next();
  });
});

UserSchema.statics.authenticate = (username, password, next) => {
  User.findOne({ username }).exec((err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const newErr = new Error('User not found.');
      newErr.status = 401;
      return next(newErr);
    }
    bcrypt.compare(password, user.password, (_, result) => {
      if (result === true) {
        return next(null, user);
      }
      return next();
    });
  });
};*/

const User = mongoose.model('User', UserSchema);

module.exports = User;
