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
        notEmpty: {
          args: true,
          msg: 'Content cannot be empty.'
        },
        len: {
          args: [3, 255],
          msg: 'Content must be between 3 - 255 characters in length.'
        }
      }
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Status cannot be an empty string.'
        },
        isIn: {
          args: [[null, 'progress', 'complete']],
          msg: 'Status must be set to either null, "progress", or "complete".'
        }
      }
    }
  })

  return Todo
}