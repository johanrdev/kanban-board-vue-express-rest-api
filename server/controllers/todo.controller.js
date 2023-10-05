const db = require('../database')
const Todo = db.todos

// Get all todo items
exports.findAll = (req, res) => {
  Todo.findAll()
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      res.status(500)
        .send({
          message: error.message ||'An error occurred while retrieving all todo items.'
        })
    })
}

// Get a single todo item
exports.findOne = (req, res) => {
  const id = req.params.id
  
  Todo.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404)
          .send({
            message: 'Could not find the todo item.'
          })
      }
    })
    .catch(() => {
      res.status(500)
        .send({
          message: 'An error occurred while retrieving the todo item.'
        })
    })
}

// Create a new todo item
exports.create = (req, res) => {
  if (!req.body.content) {
    return res.status(400)
      .send({
        message: 'Content cannot be empty.'
      })
  }

  Todo.create({ content: req.body.content, status: req.body.status !== null ? req.body.status : null })
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      res.status(500)
        .send({
          message: error.message ||'An error occurred while creating the todo item.'
        })
    })
}

// Update a single todo item
exports.update = (req, res) => {
  const id = req.params.id

  Todo.update({ content: req.body.content, status: req.body.status }, { where: { id } })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: 'Successfully updated the todo item.'
        })
      } else {
        res.send({
          message: 'Could not update the todo item.'
        })
      }
    })
    .catch((error) => {
      res.status(500)
        .send({
          message: error.message || 'An error occurred while trying to update the todo item.'
        })
    })
}

// Delete a single todo item
exports.delete = (req, res) => {
  const id = req.params.id

  Todo.destroy({ where: { id } })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: 'Successfully deleted the todo item.'
        })
      } else {
        res.send({
          message: 'Could not delete the todo item.'
        })
      }
    })
    .catch(() => {
      res.status(500)
        .send({
          message: 'An error occurred while trying to delete the todo item.'
        })
    })
}

// Delete all todo items
exports.deleteAll = (req, res) => {
  Todo.truncate()
    .then((count) => {
      res.send({
        message: `Successfully deleted ${count} todo items.`
      })
    })
    .catch((error) => {
      res.status(500)
        .send({
          message: error.message || 'An error occurred while trying to delete all todo items.'
        })
    })
}