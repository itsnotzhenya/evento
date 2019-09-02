<template>
  <el-header class="header">
    <slot name="right-menu"></slot>
  </el-header>
</template>

<script>
export default {
  name: 'TopBar'
}
</script>

<style>
  .header {
    width: 100%;
    background-color: rgb(209, 209, 209);
  }
</style>
