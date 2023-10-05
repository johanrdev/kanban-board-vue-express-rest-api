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
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255]
      }
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        notEmpty: true,
        isIn: [[null, 'progress', 'complete']]
      }
    }
  })

  return Todo
}