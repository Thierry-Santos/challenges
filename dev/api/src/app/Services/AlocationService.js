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

    if (!!!heros) {
      return {message: 'There is no Heros to defend this occurrence'}
    }

    let herosDistances = [];

    for (const hero of heros) {
      const isAllocated = await HeroOccurrence.findOne({
        where: {
          hero_id: hero.id, 
          deleted_at: null
        }
      });

      if (!isAllocated) {
        const distance = await CalculateLocations(
          occurrence.location.lat,
          occurrence.location.lng,
          hero.location.lat,
          hero.location.lng,
        );

        console.log('\n\n\n', occurrence.location.lat, hero.location.lat, typeof occurrence.location.lat, typeof hero.location.lat, '\n\n\n')

        herosDistances.push({id: hero.id, distance, hero_rank: hero.rank.toLowerCase()});
      };
    }

    herosDistances.sort(function(a, b){return a.distance-b.distance});
    console.log('\n\n\n', herosDistances, '\n\n\n')

    let herosOccurrences = [];
    let dangerSum = 0;
    let i = 0;

    while(
      (i < herosDistances.length) || 
      (dangerSum >= await DangerEnum[occurrence.danger_level])
    ) {
      console.log('ooooi', herosDistances[i].id, occurrence.id)
      dangerSum += await RankEnum[herosDistances[i].hero_rank]
      await HeroOccurrence.create({
        hero_id: herosDistances[i].id,
        occurrence_id: occurrence.id,
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