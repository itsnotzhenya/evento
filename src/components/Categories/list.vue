<template>
  <base-crud :action="action" create :module="'Categories'">
    <template slot="crud-title">Категории</template>
    <template slot="crud-content">
      <div v-loading="load">
        <el-tree :data="categoriesTree" node-key="id">
          <span class="custom-tree-node" slot-scope="{ node }">
            <span>{{ node.data.name }}</span>
            <span>
              <el-button type="text" size="mini" @click="createCategory(node.data.id)">
                <i class="el-icon-plus"></i>
              </el-button>
              <el-button type="text" size="mini" @click="readCategory(node.data.id)">
                <i class="el-icon-info"></i>
              </el-button>
              <el-button type="text" size="mini" @click="editCategory(node.data.id)">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button type="text" size="mini" @click="onDelete(node.data.id)">
                <i class="el-icon-delete"></i>
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </template>
  </base-crud>
</template>

<script>
import BaseCrud from '@/components/BaseCRUD/view'
import DataTable from '@/components/DataTable/DataTable'
import crudMixin from '@/mixins/crudMixin'
import categoriesApi from '@/api/categories'
import { makeTree } from '@/helpers/makeTree'
import { mapGetters } from 'vuex'

export default {
  name: 'CategoryList',
  mixins: [crudMixin],
  data: () => ({
    categoriesTree: [],
    category: {},
    deleteItemId: 0,
    load: true
  }),
  computed: {
    ...mapGetters({
      categories: 'app/categories'
    })
  },
  components: {
    BaseCrud,
    DataTable
  },
  async mounted () {
    await this.loadData()
  },
  methods: {
    async loadData () {
      this.load = true
      let data = await this.getCategories()
      this.categoriesTree = this.categories.items
      this.load = false
    },
    async getCategories (params = {}) {
      await this.$store.dispatch('app/getEntities', {
        mutationName: 'SET_CATEGORIES',
        entityName: 'categories',
        params
      })
    },
    onDelete (id) {
      this.deleteItemId = id
      this.$confirm('Вы уверены, что хотите удалить элемент?', '', {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'warning'
      }).then(this.onDialogConfirm)
    },
    async onDialogConfirm () {
      try {
        await this.deleteCategory(this.deleteItemId)
        this.$message({
          message: 'Удаление успешно',
          type: 'success'
        })
        this.loadData()
      } catch (err) {
        console.log(err)
        if (err.response && err.response.data.detail) {
          this.$message({
            message: err.response.data.detail,
            type: 'error'
          })
        } else {
          console.error(err)
        }
      }
    },
    async deleteCategory (id) {
      await categoriesApi.delete(id)
    },
    readCategory (id) {
      this.$router.push({ path: `/categories/${id}/show` })
    },
    editCategory (id) {
      this.$router.push({ path: `/categories/${id}/edit` })
    },
    createCategory (id) {
      this.$router.push({ path: `/categories/${id}/create` })
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
