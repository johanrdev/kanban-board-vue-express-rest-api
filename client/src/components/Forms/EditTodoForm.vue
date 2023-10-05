<template lang="html">
  <form @submit.prevent="updateTodo" class="flex flex-col">
    <div class="bg-rose-500 text-white text-sm p-4 rounded mb-4" v-if="errorMessage">{{
      errorMessage.replaceAll('Validation error: ', '') }}</div>
    <input type="text" v-model="editTodo.content" placeholder="Content" autocomplete="off" class="p-2 border rounded" />
    <span class="text-sm text-red-500" v-if="v$.$error">
      {{ v$.$errors[0].$message }}
    </span>

    <button type="submit" class="p-2 mt-2 bg-emerald-500 text-white rounded transition-all">Update</button>
  </form>
</template>
<script>
import { computed, ref, watch } from 'vue'
import TodoDataService from '../../services/todo.service'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'

export default {
  props: ['id'],
  setup(props, { emit }) {
    let errorMessageTimeout = null
    const errorMessage = ref('')
    const editTodo = ref({})
    const validationRules = computed(() => {
      return {
        content: { 
          required: helpers.withMessage('This field is required', required), 
          minLength: minLength(3), 
          maxLength: maxLength(255) 
        }
      }
    })
    const v$ = useVuelidate(validationRules, editTodo)

    const updateTodo = () => {
      v$.value.$validate()
        .then((isValid) => {
          if (isValid) {
            TodoDataService.updateTodo(props.id, editTodo.value)
              .then(() => {
                v$.value.$reset()
                editTodo.value = {}

                if (errorMessageTimeout) {
                  clearTimeout(errorMessageTimeout)
                }

                errorMessage.value = ''

                emit('editTodoComplete')
              })
              .catch((error) => {
                if (error.response.data.message) {
                  errorMessage.value = error.response.data.message

                  if (errorMessageTimeout) {
                    clearTimeout(errorMessageTimeout)
                  }

                  errorMessageTimeout = setTimeout(() => errorMessage.value = '', 3000)
                }
              })
          }
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
      errorMessage,
      editTodo,
      updateTodo,
      v$
    }
  }
}
</script>
<style lang="css"></style>