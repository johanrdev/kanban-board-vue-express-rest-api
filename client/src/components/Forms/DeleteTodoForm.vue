<template lang="html">
  <form @submit.prevent="deleteTodo" class="flex flex-col">
    <p class="text-center">
      You're about to delete a todo item. This action is destructive and cannot be undone. Do you
      wish to continue?
    </p>

    <button type="submit" class="p-2 mt-2 bg-emerald-500 text-white rounded transition-all">Yes, delete this item</button>
  </form>
</template>
<script>
import TodoDataService from '../../services/todo.service'

export default {
  props: ['id'],
  setup(props, { emit }) {
    const deleteTodo = () => {
      if (!props.id) return
      
      TodoDataService.deleteTodo(props.id)
        .then(() => {
          emit('deleteTodoComplete')
        })
        .catch((error) => {
          console.error(error)
        })
    }

    return {
      deleteTodo
    }
  }
}
</script>
<style lang="css"></style>