const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const FunctionModel = require('./function.model');

const TicketModel = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    functionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: FunctionModel,
            key: 'id',
        },
    },
    buyer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('reserved', 'cancelled'),
        defaultValue: 'reserved',
    },
}, {
    tableName: 'tickets',
    timestamps: false,
});

TicketModel.belongsTo(FunctionModel, { foreignKey: 'functionId' });
FunctionModel.hasMany(TicketModel, { foreignKey: 'functionId' });

module.exports = TicketModel;