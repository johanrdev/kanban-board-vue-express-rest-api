const config = require('./config')

const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(config)
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.todos = require('../models/todo.model')(Sequelize, sequelize)

module.exports = db