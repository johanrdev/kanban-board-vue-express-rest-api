<template lang="html">
  <form @submit.prevent="updateTodo" class="flex flex-col">
    <input type="text" v-model="editTodo.content" placeholder="Content" autocomplete="off" class="p-2 border rounded" />

    <button type="submit" class="p-2 mt-2 bg-emerald-500 text-white rounded transition-all">Update</button>
  </form>
</template>
<script>
import { ref, watch } from 'vue'
import TodoDataService from '../../services/todo.service'

export default {
  props: ['id'],
  setup(props, { emit }) {
    const editTodo = ref({})

    const updateTodo = () => {
      TodoDataService.updateTodo(props.id, editTodo.value)
        .then(() => {
          editTodo.value = {}
          emit('editTodoComplete')
        })
        .catch((error) => {
          console.error(error)
        })
    }

    watch(() => props.id, () => {
      if (props.id) {
        TodoDataService.getTodo(props.id)
          .then((result) => {
            editTodo.value.id = result.data.id
            editTodo.value.content = result.data.content
            editTodo.value.status = result.data.status
          })
          .catch((error) => {
            console.error(error)
          })
      }
    })

    return {
      editTodo,
      updateTodo
    }
  }
}
</script>
<style lang="css"></style>