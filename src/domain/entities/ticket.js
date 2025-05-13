const { DataTypes } = require('sequelize');
const sequelize = require('../../shared/config/database');
const Function = require('./function');

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    functionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Function,
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

Ticket.belongsTo(Function, { foreignKey: 'functionId' });
Function.hasMany(Ticket, { foreignKey: 'functionId' });

module.exports = Ticket;