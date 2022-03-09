<template>
<div class="member">{{member}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Member',
  setup () {
    const member = 'member'
    return {
      member
    }
  }
})
</script>

<style scoped lang="scss">

</style>
