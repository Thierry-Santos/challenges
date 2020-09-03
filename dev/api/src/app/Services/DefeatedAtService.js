const HeroOccurrence = require('../models/HeroOccurrence');
const Occurrence = require('../models/Occurrence');

class DefeatedAtService {
  constructor(id){
    this.props = { id }
  }

  async call() {
    const {id} = this.props

    const heroOccurrences = await HeroOccurrence.findAll({
      where: {
        occurrence_id: id, 
        deleted_at: null
      }
    });

    if (!heroOccurrences) {
      throw new Error('Occurrence does not exist!');
    }

    const occurrence = await Occurrence.findOne({
      where: {
        id, 
        deleted_at: null
      }
    });

    for (const heroOccurrence of heroOccurrences) {
      heroOccurrence.update({ defeated_at: new Date() });
    }
    occurrence.update({ deleted_at: new Date() });

    return true;
  }
}

module.exports = DefeatedAtService;