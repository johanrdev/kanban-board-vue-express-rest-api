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

        <p>Content</p>
      </KanbanModal>
    </div>
  </transition>
</template>
<script>
import { computed, ref } from 'vue'
import KanbanColumn from './components/KanbanColumn.vue'
import KanbanModal from './components/KanbanModal.vue'
import { uuid } from 'vue-uuid'
import gsap from 'gsap'

export default {
  components: {
    KanbanColumn,
    KanbanModal
  },
  setup() {
    const addItemModal = ref(null)

    const columns = ref([
      {
        id: uuid.v1(),
        name: 'Todo',
        color: '#6366f1',
        status: null,
        data: computed(() => items.value.filter(i => i.status === null))
      },
      {
        id: uuid.v1(),
        name: 'In Progress',
        color: '#f43f5e',
        status: 'progress',
        data: computed(() => items.value.filter(i => i.status === 'progress'))
      },
      {
        id: uuid.v1(),
        name: 'Complete',
        color: '#10b981',
        status: 'complete',
        data: computed(() => items.value.filter(i => i.status === 'complete'))
      }
    ])
    const items = ref([
      { id: uuid.v1(), name: 'My first todo', status: null },
      { id: uuid.v1(), name: 'My second todo', status: null },
      { id: uuid.v1(), name: 'My third todo', status: null },
      { id: uuid.v1(), name: 'My fourth todo', status: null },
      { id: uuid.v1(), name: 'My fifth todo', status: null },
      { id: uuid.v1(), name: 'My sixth todo', status: null },
      { id: uuid.v1(), name: 'My seventh todo', status: null },
      { id: uuid.v1(), name: 'My eighth todo', status: null },
      { id: uuid.v1(), name: 'My ninth todo', status: null },
      { id: uuid.v1(), name: 'My tenth todo', status: null }
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
      addItemModal,
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