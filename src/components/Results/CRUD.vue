<template>
  <base-crud
    v-loading="loading"
    :module="`Results`"
    :action="action"
    edit
    create
    :id="id"
    @save="saveResult"
  >
    <template slot="crud-title">Результат прогноза</template>
    <template slot="crud-content">
      <el-form
        ref="form"
        :disabled="action === 'read'"
        label-position="left"
        :show-message="false"
        :model="result"
      >
        <el-row class="form__row">
          <el-col :span="10">
            <el-form-item prop="category" label="Категория:">
              <span>{{result.category.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="result.file && result.file.path">
            <img class="file" :src="`/uploads/${result.file.path}`" alt="file" />
          </el-col>
          <el-col :span="14">
            <el-form-item prop="result" :label="`${result.category.name}:`">
              <span>{{result.json.boxes[0].classname.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="result" label="Процент соответствия:">
              <span v-if="action === 'read'">{{Math.floor(result.json.boxes[0].value*100)}}%</span>
              <el-input v-if="action !== 'read'" v-model="result.json.boxes[0].value"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="name" label="Пользователь:">
              <span>{{result.user.email}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="dateCreate" label="Дата создания:">
              <span>{{result.dateCreate.slice(0, 10)}}</span>
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
import resultsApi from "@/api/results";
import categoriesApi from "@/api/categories";
import mapGetters from "vuex";

export default {
  name: "ResultsCrud",
  data: () => ({
    result: {},
    subEntities: [],
    loading: false,
    entityName: "predictions_results",
    mainObjectName: "result"
  }),
  computed: {},
  mixins: [crudMixin],
  components: {
    BaseCrud
  },
  methods: {
    async saveResult() {
      const data = { ...this.result };
      await this.save(data);
    },
    afterGet() {
      const data = { ...this.pest };
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
