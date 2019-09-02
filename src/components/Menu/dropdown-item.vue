<template>
  <el-dropdown>
      <span class="drop-link">
        {{ title }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu trigger="hover" slot="dropdown">
        <el-dropdown-item
          @click="$router.push(`${entityName}/${item.id}`)"
          v-for="(item, index) in items"
          :key="index">
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'DropdownMenu',
  props: {
    itemsGetter: String,
    title: String,
    entityName: String
  },
  computed: {
    items () {
      return this.$store.getters[this.itemsGetter]
    }
  }
}
</script>

<style>
  .drop-link {
    color: #fff
  }
</style>
