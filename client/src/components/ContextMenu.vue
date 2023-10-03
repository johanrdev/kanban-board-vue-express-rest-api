<template lang="html">
  <transition appear name="fade">
    <div class="absolute bg-white border rounded shadow z-10 w-60 p-2"
      :style="{ 'left': position.x + 'px', 'top': position.y + 'px' }" v-show="show" v-click-outside="close">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
import { ref } from 'vue';

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