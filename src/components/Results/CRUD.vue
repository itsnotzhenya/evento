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
            <el-form-item prop="category" v-if="result.category" label="Категория:">
              <span>{{result.category.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="result.file && result.file.path">
            <img class="file" :src="`/uploads/${result.file.path}`" alt="file" />
          </el-col>
          <el-col v-if="action === 'edit'" :span="10">
            <el-form-item prop="pest" required label="Объект">
              <el-select v-model="result.pest">
                <el-option
                  v-for="pest in pests"
                  :value="pest.id"
                  :key="pest.id"
                  :label="pest.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="action === 'read'" :span="14">
            <el-form-item
              prop="result"
              v-if="result.json && result.json.boxes.length"
              :label="`${result.category.name}:`"
            >
              <span>{{result.json.boxes[0].classname.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              prop="result"
              v-if="result.json && result.json.boxes.length"
              label="Процент соответствия:"
            >
              <span v-if="action === 'read'">{{Math.floor(result.json.boxes[0].value*100)}}%</span>
              <el-input v-if="action !== 'read'" v-model="result.json.boxes[0].value" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="name" v-if="result.user" label="Пользователь:">
              <span>{{result.user.email}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="dateCreate" v-if="result.dateCreate" label="Дата создания:">
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
    loading: true,
    entityName: "predictions_results",
    mainObjectName: "result"
  }),
  computed: {
    pests() {
      return this.$store.getters['app/pests'].items
    }
  },
  mixins: [crudMixin],
  components: {
    BaseCrud
  },
  mounted() {},
  methods: {
    async saveResult() {
      const data = { ...this.result };
      data.pests = []
      delete data.category
      delete data.file
      delete data.user
      delete data.json
      data.hasAnswer = true
      data.pests.push(`api/pests/${data.pest}`)
      delete data.pest
      await this.save(data);
    },
    async getPests(params = {}) {
      await this.$store.dispatch("app/getEntities", {
        mutationName: "SET_PESTS",
        entityName: "pests",
        params: {
          ...params,
          "category": `${this.result.category.id}`
        }
      })
    },
    afterGet() {
      const data = { ...this.pest };
      this.getPests();
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
