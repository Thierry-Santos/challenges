const Hero = require('../models/Hero');
const Occurrence = require('../models/Occurrence');
const HeroOccurrence = require('../models/HeroOccurrence');

const RankEnum = require('../utils/RankEnum');
const DangerEnum = require('../utils/DangerEnum');

const CalculateLocations = require('../utils/CalculateLocations');

class AlocationService {
  constructor(occurrence_id){
    this.props = {
      occurrence_id
    }
  }

  async call() {
    const {occurrence_id} = this.props

    const occurrence = await Occurrence.findOne({
      where: {
        id: occurrence_id, 
        deleted_at: null
      }
    });

    if (!occurrence) {
      return {message: ('Occurrence does not exist!')};
    }

    const heros = await Hero.findAll({where: {deleted_at: null}});

    if (!heros) {
      return {message: 'There is no Heros to defend this occurrence'}
    }

    let herosDistances = [];

    for (const hero of heros) {
        const distance = await CalculateLocations(
          occurrence.location.lat,
          occurrence.location.lng,
          hero.location.lat,
          hero.location.lng,
        );

        herosDistances.push({id: hero.id, distance, hero_rank: hero.rank.toLowerCase()});
    }

    herosDistances.sort(function(a, b){return a.distance-b.distance});
    console.log('\n\n\n', 'herosDistances', herosDistances, '\n\n\n')

    let herosOccurrences = [];
    let dangerSum = 0;
    let i = 0;

    while(
      (i < herosDistances.length) || 
      (dangerSum <= DangerEnum[occurrence.danger_level])
    ) {
      dangerSum += RankEnum[herosDistances[i].hero_rank]
      await HeroOccurrence.create({
        hero_id: Number(herosDistances[i].id),
        occurrence_id: Number(occurrence.id),
      })
      i++;
    }

    if (!heros) {
      return {message: 'There is no enough Heros to defend this occurrence'}
    }

    return herosOccurrences;
  }
}

module.exports = AlocationService;