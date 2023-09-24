<template lang="html">
  <section class="max-w-5xl mx-2 lg:mx-auto mt-24 mb-12 grid md:grid-cols-3 gap-4">
    <KanbanColumn name="Todo" color="#6366f1" status="todo" :data="todo" @change-status="onStatusChanged" />
    <KanbanColumn name="In Progress" color="#f43f5e" status="progress" :data="progress" @change-status="onStatusChanged" />
    <KanbanColumn name="Complete" color="#10b981" status="complete" :data="complete" @change-status="onStatusChanged" />
  </section>
</template>
<script>
import { computed, ref } from 'vue'
import KanbanColumn from './components/KanbanColumn.vue'
import { uuid } from 'vue-uuid'

export default {
  components: {
    KanbanColumn
  },
  setup() {
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

    const todo = computed(() => items.value.filter(i => i.status === null))
    const progress = computed(() => items.value.filter(i => i.status === 'progress'))
    const complete = computed(() => items.value.filter(i => i.status === 'complete'))

    const onStatusChanged = (data) => {
      const item = items.value.find(i => i.id === data.id)
      item.status = data.status === 'todo' ? null : data.status
    }

    return {
      todo,
      progress,
      complete,
      onStatusChanged
    }
  }
}
</script>
<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

#app {
  font-family: Poppins;
}
</style>