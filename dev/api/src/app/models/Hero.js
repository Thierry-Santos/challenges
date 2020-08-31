const { Model, DataTypes } = require('sequelize');

class Hero extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      rank: DataTypes.STRING,
      location: DataTypes.JSON,
      deleted_at: DataTypes.DATE,
    }, {
      sequelize
    })
  };

  static associate(models) {
    this.hasMany(models.HeroOccurrence)
  };
}

module.exports = Hero;