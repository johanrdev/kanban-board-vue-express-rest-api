<template lang="html">
  <section class="border p-2">
    <h2 class="text-xl mb-2" v-if="name">{{ name }} ({{ data.length }})</h2>

    <ul>
      <li v-for="item in data" :key="item.id" class="border border-l-8 rounded p-2 pb-8 mb-1 last:mb-0"
        :style="{ borderLeftColor: color }" v-if="data.length">{{ item.name }}</li>
      <li class="border border-l-8 rounded p-2 mb-1 last:mb-0" v-else>No data</li>
    </ul>
  </section>
</template>
<script>
export default {
  props: ['name', 'color', 'data'],
  setup(props) {
    console.log(props.data)
  }
}
</script>
<style lang="css"></style>