<template>
  <header class="nav">{{nav}}</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LayoutNav',
  setup () {
    const nav = 'nav'
    return {
      nav
    }
  }
})
</script>

<style scoped lang="scss">

</style>
