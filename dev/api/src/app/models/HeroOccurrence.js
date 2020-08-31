const { Model, DataTypes } = require('sequelize');

class HeroOccurrence extends Model {
  static init(sequelize) {
    super.init({
      defeated_at: DataTypes.DATE,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Hero, { foreignKey: 'hero_id', as: 'hero' })
    this.belongsTo(models.Occurrence, { foreignKey: 'occurrence_id', as: 'occurrence' })
  }
}

module.exports = HeroOccurrence;