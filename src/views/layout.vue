<template>
<div class="layout">
  <!--顶部导航栏-->
  <LayoutNav></LayoutNav>
  <!--头部-->
  <LayoutHeader></LayoutHeader>
  <!--内容区域-->
  <main>
    <router-view/>
  </main>
  <!--底部-->
  <LayoutFooter></LayoutFooter>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayoutNav from '@/components/Layout/LayoutNav.vue'
import LayoutHeader from '@/components/Layout/LayoutHeader.vue'
import LayoutFooter from '@/components/Layout/LayoutFooter.vue'
export default defineComponent({
  name: 'Layout',
  components: {
    LayoutNav,
    LayoutHeader,
    LayoutFooter
  },
  setup () {
    const layout = 'layout'
    return {
      layout
    }
  }
})
</script>

<style scoped lang="scss">

</style>
