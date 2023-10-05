<template lang="html">
  <transition appear name="fade">
    <div class="flex flex-col max-w-5xl mx-2 lg:mx-auto" @contextmenu.prevent>
      <header class="my-8 md:mt-12">
        <span class="block text-3xl md:text-4xl text-gray-300 text-center">VueKanbanBoard</span>
      </header>
      <nav class="flex justify-center md:justify-end">
        <button @click="addTodoModal.modal.toggle" class="w-12 h-12 bg-indigo-400 text-white rounded transition-all">
          <font-awesome-icon :icon="['fas', 'plus']"></font-awesome-icon>
        </button>
      </nav>
      <section class="mt-4 mb-8 grid md:grid-cols-3 gap-4">
        <transition-group appear @before-enter="beforeEnter" @enter="enter" :css="false">
          <KanbanColumn v-for="(column, index) in columns" :key="column.id" :name="column.name" :color="column.color"
            :status="column.status" :data="column.data" :data-index="index" @change-status="onStatusChanged"
            @open-context-menu="onOpenContextMenu" />
        </transition-group>
      </section>

      <!-- Add todo modal -->
      <KanbanModal title="Add item" ref="addTodoModal">
        <AddTodoForm @add-todo-complete="onAddTodoComplete" />
      </KanbanModal>

      <!-- Edit todo modal -->
      <KanbanModal title="Edit item" ref="editTodoModal">
        <EditTodoForm :id="contextMenuObject.id" @edit-todo-complete="onEditTodoComplete" />
      </KanbanModal>

      <!-- Delete todo modal -->
      <KanbanModal title="Confirm action" ref="deleteTodoModal">
        <DeleteTodoForm :id="contextMenuObject.id" @delete-todo-complete="onDeleteTodoComplete" />
      </KanbanModal>

      <!-- Context menu -->
      <ContextMenu ref="contextMenu" :position="contextMenuObject.position">
        <button v-for="item in contextMenuObject.menu" @click="item.action"
          class="w-full h-8 mb-1 last:mb-0 bg-indigo-400 text-white rounded transition-all">{{ item.name }}</button>
      </ContextMenu>
    </div>
  </transition>
</template>
<script>
import gsap from 'gsap'
import { uuid } from 'vue-uuid'
import { computed, onMounted, ref } from 'vue'
import KanbanColumn from './components/KanbanColumn.vue'
import KanbanModal from './components/KanbanModal.vue'
import ContextMenu from './components/ContextMenu.vue'
import AddTodoForm from './components/Forms/AddTodoForm.vue'
import EditTodoForm from './components/Forms/EditTodoForm.vue'
import DeleteTodoForm from './components/Forms/DeleteTodoForm.vue'
import TodoDataService from './services/todo.service'

export default {
  components: {
    KanbanColumn,
    KanbanModal,
    ContextMenu,
    AddTodoForm,
    EditTodoForm,
    DeleteTodoForm
  },
  setup() {
    // #region COLUMNS
    const columns = ref([
      {
        id: uuid.v1(),
        name: 'Todo',
        color: '#6366f1',
        status: null,
        data: computed(() => todos.value.filter(i => i.status === null))
      },
      {
        id: uuid.v1(),
        name: 'In Progress',
        color: '#f43f5e',
        status: 'progress',
        data: computed(() => todos.value.filter(i => i.status === 'progress'))
      },
      {
        id: uuid.v1(),
        name: 'Complete',
        color: '#10b981',
        status: 'complete',
        data: computed(() => todos.value.filter(i => i.status === 'complete'))
      }
    ])
    // #endregion

    // #region CONTEXT MENU
    const contextMenu = ref(null)
    const contextMenuObject = ref({
      id: null,
      position: { x: 0, y: 0 },
      menu: [
        { name: 'Add item', action: () => addTodoModal.value.modal.toggle() },
        { name: 'Edit item', action: () => editTodoModal.value.modal.toggle() },
        { name: 'Delete item', action: () => deleteTodoModal.value.modal.toggle() }
      ]
    })
    const onOpenContextMenu = (data) => {
      contextMenuObject.value.id = data.id
      contextMenuObject.value.position.x = data.x
      contextMenuObject.value.position.y = data.y
      contextMenu.value.open()
    }

    const todos = ref([])
    const loadTodos = () => {
      TodoDataService.getTodos()
        .then((result) => {
          todos.value = result.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
    // #endregion

    // #region UPDATE TODO
    const onStatusChanged = (data) => {
      const item = todos.value.find(i => i.id == data.id)
      item.status = data.status

      TodoDataService.updateTodo(data.id, { content: item.content, status: data.status })
        .catch((error) => {
          console.error(error)
        })
    }
    // #endregion

    // #region ADD TODO MODAL
    const addTodoModal = ref(null)
    const onAddTodoComplete = () => {
      contextMenuObject.value.id = null
      addTodoModal.value.modal.toggle()
      loadTodos()
    }
    // #endregion

    // #region EDIT TODO MODAL
    const editTodoModal = ref(null)
    const onEditTodoComplete = () => {
      contextMenuObject.value.id = null
      editTodoModal.value.modal.close()
      loadTodos()
    }
    // #endregion

    // #region DELETE TODO MODAL
    const deleteTodoModal = ref(null)
    const onDeleteTodoComplete = () => {
      contextMenuObject.value.id = null
      deleteTodoModal.value.modal.close()
      loadTodos()
    }
    // #endregion

    // #region ANIMATION HOOKS
    const beforeEnter = (el) => {
      el.style.opacity = 0
      el.style.transform = 'translateY(50px)'
    }

    const enter = (el, done) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: .75,
        delay: el.dataset.index * .5,
        onComplete: done
      })
    }
    // #endregion

    onMounted(() => {
      loadTodos()
    })

    return {
      columns,
      contextMenu,
      contextMenuObject,
      onOpenContextMenu,
      onStatusChanged,
      addTodoModal,
      onAddTodoComplete,
      editTodoModal,
      onEditTodoComplete,
      deleteTodoModal,
      onDeleteTodoComplete,
      beforeEnter,
      enter
    }
  }
}
</script>
<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

#app {
  font-family: Poppins;
  height: 100vh;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease-in-out;
}

.fade-leave-active {
  position: absolute;
}
</style>