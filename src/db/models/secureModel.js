const { DataTypes } = require('sequelize')
const { conn: connection} = require('../db')

const attr = {

    id:{
        type:  DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

const opt = {

    sequelize: connection,
    timestamps: false,
    tableName: 'session_tb',
    freezeTableName: true
}

module.exports = { attr, opt}