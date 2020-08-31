const Hero = require('../../../models/Hero')

class HerosController {
  async index (req, res) {
    const heros = await Hero.findAll({where: {deleted_at: null}});

    if (!!heros) {
      return res.status(400).json({
         error: 'There is no hero registered' 
      });
    };

    return res.json(heros);
  }
  async show (req, res) {
    const { id } = req.params;
    const hero = await Hero.findOne({where: {id, deleted_at: null}})

    if (!hero) {
      return res.status(400).json({
         error: 'This hero is not registered' 
      });
    };
    
    return res.json(hero);
  }
  async create (req, res) {
    const { name, rank, location } = req.body;

    const isHero = await Hero.findOne({ where: {name} });

    if (isHero) {
      return res.status(400).json({
         error: 'This hero is already registered' 
      });
    };

    const hero = await Hero.create({ name, rank, location })

    return res.json(hero);
  }
  async update (req, res) {
    const { id } = req.params;
    const { name, rank, location } = req.body;
    const hero = await Hero.findByPk(id)

    if (!hero) {
      return res.status(400).json({
         error: 'This hero is not registered' 
      });
    };

    await hero.update({ name, rank, location })

    return res.json(hero);
  }
  async delete (req, res) {
    const { id } = req.params;
    const hero = await Hero.findByPk(id)

    if (!hero) {
      return res.status(400).json({
         error: 'This hero is not registered' 
      });
    };

    await hero.update({ deleted_at: new Date() })

    return res.sendStatus(204);
  }

};

module.exports = new HerosController();