<template lang="html">
  <div class="absolute bg-white border rounded shadow text-sm w-[120px] z-10 p-1"
    :style="{ 'left': position.x + 'px', 'top': position.y + 'px' }" v-show="show" v-click-outside="close">
    <slot></slot>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  props: ['position'],
  setup() {
    const show = ref(false)

    const open = () => {
      show.value = true
    }

    const close = () => {
      show.value = false
    }

    return {
      show,
      open,
      close
    }
  }
}
</script>
<style lang="css"></style>