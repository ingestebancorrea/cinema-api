const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Movie = require('./movie.model');

const FunctionModel = sequelize.define('Function', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    movieId: {
        type: DataTypes.INTEGER,
        references: {
            model: Movie,
            key: 'id',
        },
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    totalCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    availableCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, { 
    tableName: 'functions',
    timestamps: false 
});

FunctionModel.belongsTo(Movie, { foreignKey: 'movieId' });
Movie.hasMany(FunctionModel, { foreignKey: 'movieId' });

module.exports = FunctionModel;