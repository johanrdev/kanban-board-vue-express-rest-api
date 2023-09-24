<template lang="html">
  <section class="max-w-5xl mx-auto mt-24 mb-12 grid md:grid-cols-3 gap-4">
    <KanbanColumn name="Todo" color="indigo" />
    <KanbanColumn name="In Progress" color="rose" />
    <KanbanColumn name="Complete" color="emerald" />
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