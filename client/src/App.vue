<template lang="html">
  <transition appear name="fade">
    <div class="flex flex-col max-w-5xl mx-2 lg:mx-auto" @contextmenu.prevent>
      <header class="my-8 md:mt-12">
        <span class="block text-3xl md:text-4xl text-gray-300 text-center">VueKanbanBoard</span>
      </header>
      <nav class="flex justify-center md:justify-end">
        <button @click="addItemModal.modal.toggle" class="w-12 h-12 bg-indigo-400 text-white rounded transition-all">
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

      <!-- Add new todo modal -->
      <KanbanModal title="Add item" ref="addItemModal">
        <form @submit.prevent="addItem" class="flex flex-col">
          <input type="text" v-model="newItem.content" placeholder="Content" autocomplete="off"
            class="p-2 border rounded" />

          <button type="submit" class="p-2 mt-2 bg-emerald-500 text-white rounded transition-all">Add</button>
        </form>
      </KanbanModal>

      <!-- Edit todo modal -->
      <KanbanModal title="Edit item" ref="editItemModal" @modal-toggled="onEditModalToggled">
        <form @submit.prevent="updateItem" class="flex flex-col">
          <input type="text" v-model="editItem.content" placeholder="Content" autocomplete="off"
            class="p-2 border rounded" />

          <button type="submit" class="p-2 mt-2 bg-emerald-500 text-white rounded transition-all">Update</button>
        </form>
      </KanbanModal>

      <!-- Confirm action modal -->
      <KanbanModal title="Confirm action" ref="confirmActionModal">
        <form @submit.prevent="deleteItem" class="flex flex-col">
          <p class="text-center">Please confirm this action.</p>

          <button type="submit" class="p-2 mt-2 bg-emerald-500 text-white rounded transition-all">Confirm</button>
        </form>
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
import TodoDataService from './services/todo.service'

export default {
  components: {
    KanbanColumn,
    KanbanModal,
    ContextMenu
  },
  setup() {
    const addItemModal = ref(null)
    const editItemModal = ref(null)
    const confirmActionModal = ref(null)

    const newItem = ref({})
    const editItem = ref({})

    const addItem = () => {
      TodoDataService.createTodo(newItem.value)
        .then(() => {
          newItem.value = {}
          addItemModal.value.modal.close()
          loadTodos()
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const updateItem = () => {
      TodoDataService.updateTodo(editItem.value.id, editItem.value)
        .then(() => {
          editItemModal.value.modal.close()
          loadTodos()
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const deleteItem = () => {
      TodoDataService.deleteTodo(contextMenuObject.value.id)
        .then(() => {
          confirmActionModal.value.modal.close()
          loadTodos()
        })
        .catch((error) => {
          console.error(error)
        })
    }

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

    const todos = ref([])

    const contextMenu = ref(null)

    const contextMenuObject = ref({
      id: null,
      position: { x: 0, y: 0 },
      menu: [
        { name: 'Add item', action: () => addItemModal.value.modal.toggle() },
        { name: 'Edit item', action: () => editItemModal.value.modal.toggle() },
        { name: 'Delete item', action: () => confirmActionModal.value.modal.toggle() }
      ]
    })

    const loadTodos = () => {
      TodoDataService.getTodos()
        .then((result) => {
          todos.value = result.data
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const onStatusChanged = (data) => {
      const item = todos.value.find(i => i.id == data.id)
      item.status = data.status

      TodoDataService.updateTodo(data.id, { content: item.content, status: data.status })
        .catch((error) => {
          console.error(error)
        })
    }

    const onEditModalToggled = () => {
      TodoDataService.getTodo(contextMenuObject.value.id)
        .then((result) => {
          editItem.value.id = result.data.id
          editItem.value.content = result.data.content
          editItem.value.status = result.data.status
        })
        .catch((error) => {
          console.error(error)
        })
    }

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

    const onOpenContextMenu = (data) => {
      contextMenuObject.value.id = data.id
      contextMenuObject.value.position.x = data.x
      contextMenuObject.value.position.y = data.y
      contextMenu.value.open()
    }

    onMounted(() => {
      loadTodos()
    })

    return {
      addItemModal,
      editItemModal,
      confirmActionModal,
      newItem,
      editItem,
      addItem,
      updateItem,
      deleteItem,
      columns,
      contextMenu,
      contextMenuObject,
      onOpenContextMenu,
      onStatusChanged,
      onEditModalToggled,
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
  height: 200vh;
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