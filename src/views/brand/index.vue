<template>
<div class="brand">{{brand}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Brand',
  setup () {
    const brand = 'brand'
    return {
      brand
    }
  }
})
</script>

<style scoped lang="scss">

</style>
