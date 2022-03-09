<template>
<div class="home">{{home}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Home',
  setup () {
    const home = 'home'
    return {
      home
    }
  }
})
</script>

<style scoped lang="scss">

</style>
