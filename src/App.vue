<template lang="html">
  <section class="max-w-5xl mx-auto mt-24 mb-12 grid md:grid-cols-3 gap-4">
    <KanbanColumn name="Todo" color="#6366f1" />
    <KanbanColumn name="In Progress" color="#f43f5e" />
    <KanbanColumn name="Complete" color="#10b981" />
  </section>
</template>
<script>
import KanbanColumn from './components/KanbanColumn.vue'

export default {
  components: {
    KanbanColumn
  },
  setup() {

  }
}
</script>
<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

#app {
  font-family: Poppins;
}
</style>