<template lang="html">
  <form @submit.prevent="addTodo" class="flex flex-col">
    <input type="text" v-model="newTodo.content" placeholder="Content" autocomplete="off" class="p-2 border rounded" />

    <button type="submit" class="p-2 mt-2 bg-emerald-500 text-white rounded transition-all">Add</button>
  </form>
</template>
<script>
import { ref } from 'vue'
import TodoDataService from '../../services/todo.service'

export default {
  setup(_, { emit }) {
    const newTodo = ref({})

    const addTodo = () => {
      TodoDataService.createTodo(newTodo.value)
        .then(() => {
          newTodo.value = {}

          emit('addTodoComplete')
        })
        .catch((error) => {
          console.error(error)
        })
    }

    return {
      newTodo,
      addTodo
    }
  }
}
</script>
<style lang="css"></style>