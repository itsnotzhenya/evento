<template>
  <base-crud
    v-loading="loading"
    :module="`Pests`"
    :action="action"
    create
    edit
    :id="id"
    @save="savePest"
  >
    <template slot="crud-title">Объект</template>
    <template slot="crud-content">
      <el-form
        ref="form"
        :disabled="action === 'read'"
        label-position="left"
        :show-message="false"
        :model="pest"
      >
        <el-row class="form__row">
          <el-col :span="10">
            <el-form-item prop="name" required label="Название">
              <el-input type="text" v-model="pest.name" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="category" label="Категория">
              <el-select v-model="pest.category">
                <el-option
                  v-for="category in categories"
                  :value="category.value"
                  :key="category.id"
                  :label="category.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </base-crud>
</template>

<script>
import BaseCrud from '@/components/BaseCRUD/view'
import crudMixin from '@/mixins/crudMixin'
import pestsApi from '@/api/pests'
import categoriesApi from '@/api/categories'
import mapGetters from 'vuex'

export default {
  name: 'PestsCrud',
  data: () => ({
    pest: {
      name: '',
      category: {},
      enabled: true
    },
    categories: {},
    subEntities: [],
    loading: false,
    entityName: 'pests',
    mainObjectName: 'pest'
  }),
  mixins: [crudMixin],
  components: {
    BaseCrud
  },
  async mounted () {
    const result = await this.getCategories()
    this.categories = this.$store.getters['app/categories'].items
  },
  methods: {
    async savePest () {
      const data = { ...this.pest }
      data.category = `api/categories/${data.category}`
      await this.save(data)
    },
    async getCategories (params = {}) {
      await this.$store.dispatch('app/getEntities', {
        mutationName: 'SET_CATEGORIES',
        entityName: 'categories',
        params
      })
    }
  }
}
</script>

<style>
.date-picker {
  width: 100% !important;
}
.form__row {
  display: flex;
  flex-direction: column;
}
</style>
