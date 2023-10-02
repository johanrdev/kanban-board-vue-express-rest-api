module.exports = (db) => {
  db.sequelize.authenticate()
    .then(() => {
      console.log('Successfully connected to the database.')
      
      db.sequelize.sync({ force: true })
        .then(() => {
          console.log('Successfully created the database tables.')
          
          db.todos.create({ content: 'My first todo' })
          db.todos.create({ content: 'My second todo', status: 'progress' })
          db.todos.create({ content: 'My third todo' })
          db.todos.create({ content: 'My fourth todo' })
          db.todos.create({ content: 'My fifth todo' })
        })
    })
    .catch(() => {
      console.log('An error occurred while trying to connect to the database.')
    })
}