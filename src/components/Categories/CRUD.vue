<template>
  <base-crud
    v-loading="loading"
    :module="`Categories`"
    :action="action"
    create
    edit
    :id="id"
    @save="saveCategory"
  >
    <template slot="crud-title">Категория</template>
    <template slot="crud-content">
      <el-form
        ref="form"
        :disabled="action === 'read'"
        label-position="left"
        :show-message="false"
        :model="category"
      >
        <el-row class="form__row">
          <el-col :span="10">
            <el-form-item hidden>
              <el-input v-model="category.parent" prop="parent"></el-input>
            </el-form-item>
            <el-form-item prop="name" required label="Название">
              <el-input type="name" v-model="category.name" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="description" label="Описание">
              <el-input v-model="category.description" />
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
import categoriesApi from "@/api/categories";

export default {
  name: "CategoriesCrud",
  data: () => ({
    category: {
      name: "",
      description: ""
    },
    parent_id: 0,
    subEntities: [],
    loading: false,
    entityName: "categories",
    mainObjectName: "category"
  }),
  mixins: [crudMixin],
  components: {
    BaseCrud
  },
  computed: {},
  mounted(){
    if(this.$route.params.id) {
      this.parent_id = this.$route.params.id
    }
  },
  methods: {
    async saveCategory() {
      const data = { ...this.category };
      if(this.parent_id !== 0 && this.$route.meta.action === 'create') {
        data.parent = `api/categories/${this.parent_id}`
      }
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
