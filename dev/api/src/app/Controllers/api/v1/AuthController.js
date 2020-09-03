const User = require('../../../models/User');
const AuthenticateUserService = require('../../../Services/AuthenticateUserService');

class AuthController {
  async authenticate (req, res) {
    try {
      const { name, password } = req.body;

      const authenticateUser = await new AuthenticateUserService(
        name, 
        password,
      ).call();

      const data = {
        user: authenticateUser.user.name,
        token: authenticateUser.token
      };

      return res.json(data);
    } catch (err) {
      console.log('Authenticate ', err)
      return res.sendStatus(400);
    }
  }
};

module.exports = new AuthController();