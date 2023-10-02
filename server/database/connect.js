module.exports = (db) => {
  db.sequelize.authenticate()
    .then(() => {
      console.log('Successfully connected to the database.')
      
      db.sequelize.sync({ force: true })
        .then(() => {
          console.log('Successfully created the database tables.')
        })
    })
    .catch(() => {
      console.log('An error occurred while trying to connect to the database.')
    })
}