<template lang="html">
  <form @submit.prevent="addTodo" class="flex flex-col">
    <input type="text" v-model="newTodo.content" placeholder="Content" autocomplete="off" class="p-2 border rounded" />
    <span class="text-sm text-red-500" v-if="v$.$error">
      {{ v$.$errors[0].$message }}
    </span>

    <button type="submit"
      class="p-2 mt-2 bg-emerald-500 text-white rounded transition-all">Add</button>
  </form>
</template>
<script>
import { computed, ref } from 'vue'
import TodoDataService from '../../services/todo.service'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'

export default {
  setup(_, { emit }) {
    const newTodo = ref({})
    const validationRules = computed(() => {
      return {
        content: { required, minLength: minLength(3), maxLength: maxLength(255) }
      }
    })
    const v$ = useVuelidate(validationRules, newTodo)

    const addTodo = () => {
      v$.value.$validate()
        .then((isValid) => {
          if (isValid) {
            TodoDataService.createTodo(newTodo.value)
              .then(() => {
                v$.value.$reset()
                newTodo.value = {}
                emit('addTodoComplete')
              })
              .catch((error) => {
                console.error(error)
              })
          }
        })
    }

    return {
      newTodo,
      addTodo,
      v$
    }
  }
}
</script>
<style lang="css"></style>