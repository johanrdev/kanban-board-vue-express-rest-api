<template lang="html">
  <section class="border p-2">
    <h2 class="text-xl mb-2" v-if="name">{{ name }}</h2>

    <ul>
      <li v-for="index in 5" :key="index" class="min-h-[80px] border border-l-8 rounded p-2 mb-1 last:mb-0"
        :style="{ borderLeftColor: color }">Item {{ index }}</li>
    </ul>
  </section>
</template>
<script>
export default {
  props: ['name', 'color'],
  setup(props) {
  }
}
</script>
<style lang="css"></style>