const { Sequelize } = require('sequelize')


const conn = new Sequelize({ storage: `${process.cwd()}/db_sqlite_t4.sqlite`, dialect: "sqlite", pool: { maxUses: 2 } })

module.exports = { conn}