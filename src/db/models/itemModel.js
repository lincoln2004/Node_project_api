const { DataTypes } = require('sequelize')
const { conn: connection } = require('../db')

const attr = {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}

const opt = {

    sequelize: connection,
    tableName: 'items_tb',
    timestamps: false,
    freezeTableName: true
}

module.exports = { conf: {attr, opt}}