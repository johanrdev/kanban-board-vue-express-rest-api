module.exports = (app) => {
  const baseUrl = '/api/todos'
  const controller = require('../controllers/todo.controller')
  const router = require('express').Router()

  router.get('/', controller.findAll)
  router.get('/:id', controller.findOne)
  router.post('/', controller.create)
  router.put('/:id', controller.update)
  router.delete('/:id', controller.delete)
  router.delete('/', controller.deleteAll)

  app.use(baseUrl, router)
}