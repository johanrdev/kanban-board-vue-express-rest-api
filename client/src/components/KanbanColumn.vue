<template lang="html">
  <section class="flex flex-col border rounded bg-gray-100 p-2">
    <h2 class="text-md text-center text-gray-500 uppercase tracking-widest mb-4" v-if="name">{{ name }} ({{
      data.length }})</h2>

    <transition-group name="fade" tag="ul" class="relative grow h-[300px] lg:h-[500px] overflow-y-auto transition-all"
      @drop="onDrop($event)" @dragenter.prevent @dragover.prevent>
      <li v-for="item in data" :key="item.id"
        class="border border-l-8 rounded bg-white p-2 mb-1 last:mb-0 left-0 right-0 cursor-move select-none"
        :style="{ borderLeftColor: color }" v-if="data.length" draggable="true" @dragstart="startDrag($event, item)"
        @contextmenu="openContextMenu($event, item.id)">
        <span class="block text-md text-gray-950 mb-4">{{ item.content }}</span>
        <span class="block text-xs text-gray-400 text-right">{{ item.id }}</span>
      </li>
      <li class="border border-l-8 rounded bg-white p-2 mb-1 last:mb-0 left-0 right-0" v-else>No data</li>
    </transition-group>
  </section>
</template>
<script>
export default {
  props: ['name', 'color', 'status', 'data'],
  setup(props, { emit }) {
    const startDrag = (event, item) => {
      event.dataTransfer.setData('id', item.id)
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
    }

    const onDrop = (event) => {
      const id = event.dataTransfer.getData('id')
      emit('changeStatus', { id, status: props.status })
    }

    const openContextMenu = (event, id) => {
      emit('openContextMenu', { id, x: event.pageX, y: event.pageY })
    }

    return {
      startDrag,
      onDrop,
      openContextMenu
    }
  }
}
</script>