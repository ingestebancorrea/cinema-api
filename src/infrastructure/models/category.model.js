const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const CategoryModel = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { 
    tableName: 'categories',
    timestamps: false 
});

module.exports = CategoryModel;