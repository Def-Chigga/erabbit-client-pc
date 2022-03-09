<template>
  <header class="footer">{{footer}}</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LayoutFooter',
  setup () {
    const footer = 'footer'
    return {
      footer
    }
  }
})
</script>

<style scoped lang="scss">

</style>
