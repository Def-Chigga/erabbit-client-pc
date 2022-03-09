<template>
<header class="header">{{header}}</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LayoutHeader',
  setup () {
    const header = 'header'
    return {
      header
    }
  }
})
</script>

<style scoped lang="scss">

</style>
