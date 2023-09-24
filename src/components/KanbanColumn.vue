<template lang="html">
  <section class="border p-2">
    <h2 class="text-xl mb-2" v-if="name">{{ name }} ({{ data.length }})</h2>

    <ul @drop="onDrop($event)" @dragenter.prevent @dragover.prevent>
      <li v-for="item in data" :key="item.id"
        class="border border-l-8 rounded flex flex-col p-2 mb-1 last:mb-0 cursor-move select-none"
        :style="{ borderLeftColor: color }" v-if="data.length" draggable="true" @dragstart="startDrag($event, item)">
        <span class="mb-8">{{ item.name }}</span>
        <span class="text-xs text-right text-gray-400">{{ item.id }}</span>
      </li>
      <li class="border border-l-8 rounded p-2 mb-1 last:mb-0" v-else>No data</li>
    </ul>
  </section>
</template>
<script>
export default {
  props: ['name', 'color', 'data'],
  setup(props) {
    const startDrag = (event, item) => {
      event.dataTransfer.setData('id', item.id)
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
    }

    const onDrop = (event) => {
      const id = event.dataTransfer.getData('id')
      console.log('id:', id)
    }

    return {
      startDrag,
      onDrop
    }
  }
}
</script>
<style lang="css"></style>