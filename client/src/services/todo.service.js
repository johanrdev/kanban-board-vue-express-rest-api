import config from './axios.config'

class TodoDataService {
  getTodos() {
    return config.get('/todos')
  }

  createTodo(data) {
    return config.post('/todos', data)
  }

  updateTodo(id, data) {
    return config.put(`/todos/${id}`, data)
  }
}

export default new TodoDataService()