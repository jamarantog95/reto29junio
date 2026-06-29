const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pokemon = sequelize.define('Pokemon', {
   id: { type: DataTypes.INTEGER, primaryKey: true },
   name: { type: DataTypes.STRING, allowNull: false },
   base_experience: { type: DataTypes.INTEGER },
   height: { type: DataTypes.INTEGER },
   weight: { type: DataTypes.INTEGER },
   sprite_url: { type: DataTypes.STRING }
}, {
   timestamps: true
});

module.exports = Pokemon;