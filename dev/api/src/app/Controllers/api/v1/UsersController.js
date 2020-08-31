const User = require('../../../models/User');
const CreateUserService = require('../../../Services/CreateUserService');

class UsersController {
  async create (req, res) {
    const { name, password } = req.body;

    const user = await new CreateUserService(name, password).call();

    if (user.message) {
      return res.status(400).json({
        error: user.message 
     });
    }

    return res.json({
      name: user.name,
      created_at: user.created_at,
      updated_at: user.update_at,
    });
  }

  async update (req, res) {
    const { id } = req.auth;
    const { name } = req.body;

    const user = await User.findByPk(id);
    
    const nameUse = await User.findOne({where: {name}});

    if (nameUse) {
      return res.status(400).json({
         error: 'Name already in use!' 
      });
    };

    await user.update({ name })

    return res.json({
      name: user.name,
      created_at: user.created_at,
      updated_at: user.update_at,
    });
  }
};

module.exports = new UsersController();