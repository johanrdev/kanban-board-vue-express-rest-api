module.exports = (Sequelize, sequelize) => {
  const Todo = sequelize.define('todo', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
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