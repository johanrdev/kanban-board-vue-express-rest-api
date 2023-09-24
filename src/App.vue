<template lang="html">
  <section class="max-w-5xl mx-auto mt-24 mb-12 grid md:grid-cols-3 gap-4">
    <div class="border p-2">
      <h2 class="text-xl mb-2">Todo (0)</h2>
      <ul>
        <li v-for="index in 5" :key="index"
          class="p-2 mb-1 last:mb-0 min-h-[80px] border border-l-8 border-l-indigo-500 rounded">Item {{ index }}</li>
      </ul>
    </div>
    <div class="border p-2">
      <h2 class="text-xl mb-2">Progress (0)</h2>
      <ul>
        <li v-for="index in 5" :key="index"
          class="p-2 mb-1 last:mb-0 min-h-[80px] border border-l-8 border-l-rose-500 rounded">Item {{ 5 + index }}</li>
      </ul>
    </div>
    <div class="border p-2">
      <h2 class="text-xl mb-2">Complete (0)</h2>
      <ul>
        <li v-for="index in 5" :key="index"
          class="p-2 mb-1 last:mb-0 min-h-[80px] border border-l-8 border-l-emerald-500 rounded">Item {{ 10 + index }}</li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
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