const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Category = require('./category.model');

const MovieModel = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    duracion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        },
    },
}, {
    tableName: 'movies',
    timestamps: false,
});

MovieModel.belongsTo(Category, { foreignKey: 'categoria_id' });
Category.hasMany(MovieModel, { foreignKey: 'categoria_id' });

module.exports = MovieModel;