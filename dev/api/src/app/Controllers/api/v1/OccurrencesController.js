const Occurrence = require('../../../models/Occurrence');
const HeroOccurrence = require('../../../models/HeroOccurrence');

const AlocationService = require('../../../Services/AlocationService');
const DefeatedAtService = require('../../../Services/DefeatedAtService');

class OccurrencesController {
  async index (req, res) {
    const occurrences = await Occurrence.findAll();

    if (!occurrences) {
      return res.status(400).json({
         error: 'There is no occurrence registered' 
      });
    };

    return res.json(occurrences);
  }

  async show (req, res) {
    const { id } = req.params;
    const occurrence = await Occurrence.findOne({where: {id, deleted_at: null}})

    if (!occurrence) {
      return res.status(400).json({
         error: 'This occurrence is not registered' 
      });
    };
    
    return res.json(occurrence);
  }

  async create (req, res) {
    const { monster_name, danger_level, location } = req.body;

    const occurrence = await Occurrence.create({ 
      monster_name, 
      danger_level, 
      location 
    });

    const heroOccurrence = await new AlocationService(occurrence.id).call();

    return res.json(heroOccurrence);
  }

  async update (req, res) {
    const { id } = req.params;
    const { monster_name, danger_level, location } = req.body;
    const occurrence = await Occurrence.findOne({where: {id, deleted_at: null}})

    if (!occurrence) {
      return res.status(400).json({
         error: 'This occurrence is not registered' 
      });
    };

    await occurrence.update({ 
      monster_name,
      danger_level,
      location    
    })

    return res.json(occurrence);
  }

  async delete (req, res) {
    const { id } = req.params;
    const occurrence = await Occurrence.findByPk(id)

    if (!occurrence) {
      return res.status(400).json({
         error: 'This occurrence is not registered' 
      });
    };

    const heroOccurrences = await HeroOccurrence.findAll({where: {id: occurrence.id}});

    if (!!heroOccurrences) {
      for (heroOccurrence of heroOccurrences) {
        await heroOccurrence.update({ defeated_at: new Date() })
      }
    };

    await occurrence.update({ deleted_at: new Date() })

    return res.sendStatus(204);
  }

  async checkHeroOccurrence (req, res) {
    try {
      const { id } = req.params;

      await new AlocationService(id).call();
      await new DefeatedAtService(id).call();

      return res.sendStatus(204);
    } catch (err) {
      return res.sendStatus(400);
    }
  }

};

module.exports = new OccurrencesController();