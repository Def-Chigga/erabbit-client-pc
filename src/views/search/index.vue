<template>
<div class="search">{{search}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Search',
  setup () {
    const search = 'search'
    return {
      search
    }
  }
})
</script>

<style scoped lang="scss">

</style>
