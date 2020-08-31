const { Model, DataTypes } = require('sequelize');

class Occurrence extends Model {
  static init(sequelize) {
    super.init({
      monster_name: DataTypes.STRING,
      danger_level: DataTypes.STRING,
      location: DataTypes.JSON,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.HeroOccurrence)
  }
}

module.exports = Occurrence;