const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Hero = require('../app/models/Hero');
const Occurrence = require('../app/models/Occurrence');
const HeroOccurrence = require('../app/models/HeroOccurrence');

const connection = new Sequelize(dbConfig);

User.init(connection);
Hero.init(connection);
Occurrence.init(connection);
HeroOccurrence.init(connection);

Hero.associate(connection.models);
Occurrence.associate(connection.models);
HeroOccurrence.associate(connection.models);



module.exports = connection;