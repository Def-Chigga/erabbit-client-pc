<template>
<div class="goods">{{goods}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Goods',
  setup () {
    const goods = 'goods'
    return {
      goods
    }
  }
})
</script>

<style scoped lang="scss">

</style>
