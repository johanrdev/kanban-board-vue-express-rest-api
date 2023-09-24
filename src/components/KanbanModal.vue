<template lang="html">
  <div class="fixed left-0 top-0 right-0 bottom-0">
    <!-- Overlay -->
    <div class="absolute left-0 top-0 right-0 bottom-0 bg-gray-950 opacity-70"></div>
    <!-- Container -->
    <div class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-80 p-4 bg-white rounded shadow-xl">
      <header class="mb-4">
        <slot name="header"></slot>
      </header>

      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="css">
  
</style>