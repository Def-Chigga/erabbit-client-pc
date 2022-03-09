<template>
<div class="category">{{category}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Category',
  setup () {
    const category = 'category'
    return {
      category
    }
  }
})
</script>

<style scoped lang="scss">

</style>
