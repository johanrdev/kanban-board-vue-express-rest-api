<template lang="html">
  <transition appear name="fade">
    <div class="flex flex-col max-w-5xl mx-2 lg:mx-auto">
      <header class="mt-8 md:mt-12">
        <span class="block text-3xl md:text-4xl text-gray-300 text-center">VueKanbanBoard</span>
      </header>
      <button @click="addItemModal.modal.toggle">Toggle Modal</button>
      <section class="my-8 grid md:grid-cols-3 gap-4">
        <transition-group appear @before-enter="beforeEnter" @enter="enter" :css="false">
          <KanbanColumn v-for="(column, index) in columns" :key="column.id" :name="column.name" :color="column.color"
            :status="column.status" :data="column.data" :data-index="index" @change-status="onStatusChanged" />
        </transition-group>
      </section>

      <KanbanModal ref="addItemModal">
        <template v-slot:header>
          <h2 class="text-xl">Add item</h2>
        </template>

        <form @submit.prevent="addItem" class="flex flex-col">
          <input type="text" v-bind="name" v-model="newItem.name" placeholder="Name" autocomplete="off" class="p-2 border rounded" />
          <span class="text-sm text-red-500 text-right">{{ errors.name }}</span>

          <button type="submit" :disabled="!meta.valid" class="p-2 mt-2 bg-emerald-500 text-white rounded transition-all"
            :class="{ 'bg-gray-400 text-gray-200 cursor-not-allowed': !meta.valid }">Add</button>
        </form>
      </KanbanModal>
    </div>
  </transition>
</template>
<script>
import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import KanbanColumn from './components/KanbanColumn.vue'
import KanbanModal from './components/KanbanModal.vue'
import { uuid } from 'vue-uuid'
import gsap from 'gsap'
import * as yup from 'yup'

export default {
  components: {
    KanbanColumn,
    KanbanModal
  },
  setup() {
    const addItemModal = ref(null)
    const newItem = ref({})
    const addItem = () => {
      newItem.value.id = uuid.v1()
      newItem.value.status = null
      items.value.push(newItem.value)
      resetForm()
      newItem.value = {}
      addItemModal.value.modal.close()
    }

    const { meta, errors, defineInputBinds, resetForm } = useForm({
      validationSchema: yup.object({
        name: yup.string().min(3).required()
      })
    })
    
    const name = defineInputBinds('name', {
      validateOnInput: true
    })

    const todo = computed(() => items.value.filter(i => i.status === null))
    const progress = computed(() => items.value.filter(i => i.status === 'progress'))
    const complete = computed(() => items.value.filter(i => i.status === 'complete'))

    const columns = ref([
      {
        id: uuid.v1(),
        name: 'Todo',
        color: '#6366f1',
        status: null,
        data: todo
      },
      {
        id: uuid.v1(),
        name: 'In Progress',
        color: '#f43f5e',
        status: 'progress',
        data: progress
      },
      {
        id: uuid.v1(),
        name: 'Complete',
        color: '#10b981',
        status: 'complete',
        data: complete
      }
    ])

    const items = ref([
      { id: uuid.v1(), name: 'My first todo', status: null },
      { id: uuid.v1(), name: 'My second todo', status: null },
      { id: uuid.v1(), name: 'My third todo', status: null }
    ])

    const onStatusChanged = (data) => {
      const item = items.value.find(i => i.id === data.id)
      item.status = data.status
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

    return {
      meta,
      errors,
      name,
      addItemModal,
      newItem,
      addItem,
      columns,
      onStatusChanged,
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
  transition: all .5s ease-in-out;
}

.fade-leave-active {
  position: absolute;
}
</style>