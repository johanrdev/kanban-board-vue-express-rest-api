module.exports = (app) => {
  const baseUrl = '/api/todos'
  const router = require('express').Router()

  router.get('/', (req, res) => res.send('Get all todo items'))
  router.get('/:id', (req, res) => res.send('Get a single todo item'))
  router.post('/', (req, res) => res.send('Create a new todo item'))
  router.put('/:id', (req, res) => res.send('Update a single todo item'))
  router.delete('/:id', (req, res) => res.send('Delete a single todo item'))
  router.delete('/', (req, res) => res.send('Delete all todo items'))

  app.use(baseUrl, router)
}