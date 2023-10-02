const config = require('./config')

const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(config)
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db