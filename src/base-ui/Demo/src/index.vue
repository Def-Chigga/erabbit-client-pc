<template>
<div class="demo">{{demo}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Demo',
  setup () {
    const demo = 'demo'
    return {
      demo
    }
  }
})
</script>

<style scoped lang="scss">

</style>
