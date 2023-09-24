<template lang="html">
  <div class="fixed left-0 top-0 right-0 bottom-0" v-show="modal.show">
    <!-- Overlay -->
    <div class="absolute left-0 top-0 right-0 bottom-0 bg-gray-950 opacity-70"></div>
    <!-- Container -->
    <div class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-xl w-full p-4 bg-white rounded shadow-xl">
      <header class="flex justify-between mb-4">
        <slot name="header"></slot>

        <button @click="modal.close">
          Close
        </button>
      </header>

      <slot></slot>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const modal = ref({
      show: false,
      toggle: () => modal.value.show = !modal.value.show,
      close: () => modal.value.show = false
    })

    return {
      modal
    }
  }
}
</script>
<style lang="css">
  
</style>