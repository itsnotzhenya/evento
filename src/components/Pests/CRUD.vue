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
            <el-form-item prop="category" required label="Категория">
              {{categories}}
              <el-select v-model="pest.category">
                <el-option
                  v-for="category in categories"
                  :value="category.value"
                  :key="category.value"
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
import BaseCrud from "@/components/BaseCRUD/view";
import crudMixin from "@/mixins/crudMixin";
import pestsApi from "@/api/pests";
import categoriesApi from "@/api/categories";
import mapGetters from 'vuex'

export default {
  name: "PestsCrud",
  data: () => ({
    pest: {
      name: "",
      category: {},
      enabled: true
    },
    category: {},
    subEntities: [],
    loading: false,
    entityName: "pests",
    mainObjectName: "pest",
  }),
  // computed: {
  //   ...mapGetters({
  //     categories: 'app/categories'
  //   })
  // },
  mixins: [crudMixin],
  components: {
    BaseCrud
  },
  methods: {
    async savePest() {
      const data = { ...this.pest };
      await this.save(data);
    }
  }
};
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
