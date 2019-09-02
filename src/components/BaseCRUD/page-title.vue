<template>
  <div>
    <el-row type="flex" align="middle">
      <el-col :span="4">
        <slot name="title">{{computedTitle}}</slot>
      </el-col>
      <el-col :span="18" class="text_right">
        <slot name="buttons"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'page-title',
  props: ['title'],
  computed: {
    computedTitle () {
      if (this.title) {
        return this.title
      }
      return this.$route.meta && this.$route.meta.title ? this.$route.meta.title : ''
    }
  }
}
</script>
