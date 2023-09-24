<template lang="html">
  <section class="max-w-5xl mx-auto mt-24 mb-12 grid md:grid-cols-3 gap-4">
    <KanbanColumn name="Todo" color="#6366f1" :data="todo" />
    <KanbanColumn name="In Progress" color="#f43f5e" :data="progress" />
    <KanbanColumn name="Complete" color="#10b981" :data="complete" />
  </section>
</template>
<script>
import { computed, ref } from 'vue'
import KanbanColumn from './components/KanbanColumn.vue'

export default {
  components: {
    KanbanColumn
  },
  setup() {
    const data = ref([
    { id: 0, name: 'My first todo', status: null },
      { id: 1, name: 'My second todo', status: null },
      { id: 2, name: 'My third todo', status: null },
      { id: 3, name: 'My fourth todo', status: null },
      { id: 4, name: 'My fifth todo', status: null }, 
      { id: 5, name: 'My sixth todo', status: null },
      { id: 6, name: 'My seventh todo', status: null },
      { id: 7, name: 'My eighth todo', status: null },
      { id: 8, name: 'My ninth todo', status: null },
      { id: 9, name: 'My tenth todo', status: null }
    ])

    const todo = computed(() => data.value.filter(i => i.status === null))
    const progress = computed(() => data.value.filter(i => i.status === 'progress'))
    const complete = computed(() => data.value.filter(i => i.status === 'complete'))

    return {
      todo,
      progress,
      complete
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