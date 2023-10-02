module.exports = (Sequelize, sequelize) => {
  const Todo = sequelize.define('todo', {
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    }
  })

  return Todo
}