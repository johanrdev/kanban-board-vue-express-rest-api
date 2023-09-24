<template lang="html">
  <section class="flex flex-col border p-2">
    <h2 class="text-xl mb-2" v-if="name">{{ name }} ({{ data.length }})</h2>

    <transition-group name="fade" tag="ul" class="relative grow" @drop="onDrop($event)" @dragenter.prevent @dragover.prevent>
      <li v-for="item in data" :key="item.id"
        class="border border-l-8 rounded p-2 mb-1 last:mb-0 left-0 right-0 cursor-move select-none"
        :style="{ borderLeftColor: color }" v-if="data.length" draggable="true" @dragstart="startDrag($event, item)">
        <span class="block mb-4">{{ item.name }}</span>
        <span class="block text-xs text-right text-gray-400">{{ item.id }}</span>
      </li>
      <li class="border border-l-8 rounded p-2 mb-1 last:mb-0 left-0 right-0" v-else>No data</li>
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

    return {
      startDrag,
      onDrop
    }
  }
}
</script>
<style lang="css">
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
  transition: all .4s ease-in-out;
}

.fade-leave-active {
  position: absolute;
}
</style>