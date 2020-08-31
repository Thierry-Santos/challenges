const User = require('../models/User');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const authConfig = require('../../config/auth');

class AuthenticateUserService {
  constructor(name, password){
    this.props = {
      name, password
    };
  }

  async call() {
    const { name, password } = this.props;
    const { secret, expiresIn } = authConfig.jwt;
    const user = await User.findOne({ where: { name, deleted_at: null } });

    if (!user) {
      return {message: ('Email or password incorrect!')};
    }

    const passwordCheck = await compare(password, user.password);

    if (!passwordCheck) {
      return { message: ('Email or password incorrect!') };
    }

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return {
      user,
      token,
    }
  }
}

module.exports = AuthenticateUserService;