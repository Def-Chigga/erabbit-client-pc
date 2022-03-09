<template>
<div class="notfound">{{notFound}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NotFound',
  setup () {
    const notFound = 'NotFound 404'
    return {
      notFound
    }
  }
})
</script>

<style scoped lang="scss">

</style>
