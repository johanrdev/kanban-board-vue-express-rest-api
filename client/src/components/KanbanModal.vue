<template lang="html">
  <transition appear name="fade" v-show="modal.show">
    <div class="fixed left-0 top-0 right-0 bottom-0 z-50">
      <!-- Overlay -->
      <div class="absolute left-0 top-0 right-0 bottom-0 bg-gray-950 opacity-70"></div>
      <!-- Container -->
      <div
        class="absolute left-1/2 -translate-x-1/2 top-1/4 max-w-xl w-full bg-white rounded shadow-xl overflow-hidden" v-click-outside="modal.close">
        <header class="flex justify-between p-4 bg-gray-200 text-gray-700">
          <h2 class="text-xl">{{ title }}</h2>

          <button type="button" @click="modal.close">
            <font-awesome-icon :icon="['fas', 'close']"></font-awesome-icon>
          </button>
        </header>

        <section class="p-4">
          <slot></slot>
        </section>
      </div>
    </div>
  </transition>
</template>
<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  props: ['title'],
  setup(_, { emit }) {
    const modal = ref({
      show: false,
      close: () => modal.value.show = false,
      toggle: () => {
        modal.value.show = !modal.value.show

        emit('modalToggled', modal.value.show)
      }
    })

    onMounted(() => {
      window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.value.show) {
          modal.value.close()
        }
      })
    })

    onUnmounted(() => {
      window.removeEventListener('keydown')
    })

    return {
      modal
    }
  }
}
</script>
<style lang="css"></style>