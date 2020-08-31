const User = require('../models/User');
const { hash } = require('bcryptjs');

class CreateUserService {
  constructor(name, password){
    this.props = {
      name, password
    }
  }

  async call() {
    const {name, password} = this.props

    const user = await User.findOne({where: {name, deleted_at: null}});

    if (!!user) {
      return {message: ('Name already in use!')};
    }

    const passwordHash = await hash(password, 8);

    const newUser = await User.create({ name, password: passwordHash });

    return newUser;
  }
}

module.exports = CreateUserService;